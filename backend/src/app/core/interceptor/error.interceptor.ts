import { AuthService } from '../service/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        console.log('err==>',err)
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.toastr.error(`API 登入憑證逾期或角色權限錯誤`, 'error 系統強制登出!');
          this.authenticationService.logout();
          this.router.navigate(['/authentication/signin']);
          // location.reload();
        }
        if (err.status === 400) {
          this.toastr.warning(`API 驗證錯誤:${err.error.message}`, 'warning');
          return EMPTY;
        }
        if (err.status === 403) {
          this.toastr.warning(`API 回應錯誤:${err.error.message}`, 'warning');
          return throwError(err);
        }
        if (err.status === 404) {
          this.toastr.warning(`API 回應無資料:${err.error.message}`, 'warning');
          return EMPTY;
        }
        if (err.status === 422) {
          this.toastr.warning(`API 驗證錯誤:${err.error.message}`, 'warning');
          return EMPTY;
        }
        if (err.status === 500) {
          this.toastr.error('API 伺服器回應錯誤!', 'error');
          return EMPTY;
        }
        if (err.status === 0) {
          this.toastr.error('API Server無回應，連線錯誤!', 'error');
          return EMPTY;
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
