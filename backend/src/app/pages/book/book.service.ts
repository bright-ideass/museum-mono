import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { cbc_LogDTO } from '@core/entity/admin.entity';
import { CbcLogService } from '@core/service/cbc-log.service';
import { AuthService } from '@core/service/auth.service';
import { BookDto } from '@core/entity/book.entity';
import { ConfigService } from '@config';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient,
    private cbcLogService: CbcLogService,
    private authService: AuthService,
    private configService: ConfigService,
  ) { }


  findAll(): Observable<BookDto[]> {
    return this.http.get<BookDto[]>(this.configService.configuration()?.API_URL + 'backend/book/list');
  }

  findOne(id?: number): Observable<BookDto> {
    return this.http.get<BookDto>(this.configService.configuration()?.API_URL + 'backend/book/read/' + `${id}`);
  }

  save(body: BookDto): Observable<any> {
    if (body.ID) {
      body.UpdatedByUser = this.authService?.currentAdminValue.UserName;
    } else {
      body.CreatedByUser = this.authService?.currentAdminValue.UserName;
    }

    return this.http.post<any>(this.configService.configuration()?.API_URL + `backend/book/${body.ID ? 'update' : 'create'}`, body).pipe(map(d => {
      let logs: cbc_LogDTO = { Where: 'ICM_A_Book', SubType: `book,${body.ID ? 'update,' + body.ID : 'create'}`, Memo: body.bookname };
      this.cbcLogService.cbc_LogToAuth(logs).subscribe(res => {
        console.log(res)
      });
      return d;
    }));
  }

  sort(body: BookDto[]): Observable<any> {
    return this.http.post<any>(this.configService.configuration()?.API_URL + 'backend/book/sort', body);
  }

  remove(body: BookDto): Observable<any> {
    return this.http.delete<any>(this.configService.configuration()?.API_URL + 'backend/book/delete/' + body.ID).pipe(map(d => {
      let logs: cbc_LogDTO = { Where: 'ICM_A_Book', SubType: `book,delete,${body.ID}`, Memo: body.bookname };
      this.cbcLogService.cbc_LogToAuth(logs).subscribe();
    }));
  }
}
