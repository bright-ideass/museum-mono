import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { AdminDTO, menusDTO } from '@core/entity/admin.entity';
import { Router } from '@angular/router';
import { ConfigService } from '@config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentAdminSubject: BehaviorSubject<AdminDTO>;
  public currentAdmin: Observable<AdminDTO>;
  isLogin = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private configService: ConfigService,
  ) {
    this.currentAdminSubject = new BehaviorSubject<AdminDTO>(
      JSON.parse(sessionStorage.getItem('currentAdmin') || '{}')
    );
    this.currentAdmin = this.currentAdminSubject.asObservable();
  }

  public get currentAdminValue(): AdminDTO {
    return this.currentAdminSubject.value;
  }

  cbc_login(randomNo: string) {
    sessionStorage.setItem('randomNo', randomNo);
    return this.http.post<any>(this.configService.configuration()?.CBC_LOGIN || '', { RandomNo:randomNo })
      .pipe(map(res => {
        const admin = res;
        admin.DeptName.substring(0, 3);
        if (admin?.DeptName === '經濟研') { admin.DeptName = '經研處'; }
        if (admin?.DeptName === '金融業') { admin.DeptName = '金檢處'; }
        sessionStorage.setItem('currentAdmin', JSON.stringify(admin));
        this.currentAdminSubject.next(admin);
        if (this.currentAdminSubject) {
          sessionStorage.setItem('STATE', 'true');
          this.isLogin = true;
        }
      }));

    /*

    const data = new HttpParams({
      fromObject: {
        SystemId: environment.systemId,
        RandomNo: randomNo,
        Ip: '172.20.0.21'
      }
    });
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    );

    if (this.isTestMode) {
      return this.http.get<any>(environment.cbc_login)
        .pipe(map(res => {
          const admin = res;
          // console.log('res:', res)
          admin.DeptName.substring(0, 3);
          if (admin.DeptName === '經濟研') { admin.DeptName = '經研處'; }
          if (admin.DeptName === '金融業') { admin.DeptName = '金檢處'; }
          sessionStorage.setItem('currentAdmin', JSON.stringify(admin));
          this.currentAdminSubject.next(admin);
          if (this.currentAdminSubject) {
            sessionStorage.setItem('STATE', 'true');
            this.isLogin = true;
          };
          return of({ success: this.isLogin });
        }));
    } else {
      // 以下 For CBC
      return this.http.post<any>(environment.cbc_login, data.toString(), { headers: headers })
        .pipe(map(res => {
          const admin = res;
          admin.DeptName.substring(0, 3);
          if (admin.DeptName === '經濟研') { admin.DeptName = '經研處'; }
          if (admin.DeptName === '金融業') { admin.DeptName = '金檢處'; }
          sessionStorage.setItem('currentAdmin', JSON.stringify(admin));
          this.currentAdminSubject.next(admin);
          if (this.currentAdminSubject) {
            sessionStorage.setItem('STATE', 'true');
            this.isLogin = true;
          }

          setTimeout(() => this.cbc_logTimeout(), 1380000);
          // this.Snackbar.showNotification('snackbar-info', admin.UserName + '-為登入狀態!!!', 'bottom', 'center');
          return of({ success: this.isLogin });
          // return res;
        }));
    }; */
  }


  cbc_logTimeout() {
    this.logout()
    alert('登入時間已逾期，請重新登入');
    this.router.navigate(['/']);
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.setItem('STATE', 'false');
    sessionStorage.removeItem('currentAdmin');
    sessionStorage.removeItem('randomNo');
    this.currentAdminSubject.next(this.currentAdminValue);
    return of({ success: false });
  }

  cbcGetMenus(): Observable<menusDTO[]> {
    /*
    if (this.isTestMode) {
      // For Brightideas test
      return this.http.get<any>(environment.cbc_menus);
    } else {
      // For cbc央行
      const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const data = new HttpParams({
        fromObject: {
          AuthSessionToken: AuthSessionToken
        }
      })*/
      return this.http.get<any>(this.configService.configuration()?.CBC_MENUS || '');

  }
  isLoggedIn() {
    const loggedIn = sessionStorage.getItem('STATE');
    if (loggedIn === 'true') {
      this.isLogin = true;
    } else {
      sessionStorage.removeItem('Admin');
      sessionStorage.removeItem('STATE');
      this.isLogin = false;
    }
    return this.isLogin;
  }

}
