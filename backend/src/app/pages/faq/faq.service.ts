import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CbcLogService } from '@core/service/cbc-log.service';
import { AuthService } from '@core/service/auth.service';
import { environment } from 'environments/environment';
import { FaqDto, FaqTypeDto } from '@core/entity/faq.entity';
import { cbc_LogDTO } from '@core/entity/admin.entity';
import { ConfigService } from '@config';
@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(
    private http: HttpClient,
    private cbcLogService: CbcLogService,
    private authService: AuthService,
    private configService: ConfigService,
  ) { }

  findFaqType(lang?: string): Observable<FaqTypeDto[]> {
    return this.http.get<FaqTypeDto[]>(this.configService.configuration()?.API_URL + 'backend/faq/type/' + lang);
  }

  findAll(lang?: string): Observable<FaqDto[]> {
    return this.http.get<FaqDto[]>(this.configService.configuration()?.API_URL + 'backend/faq/list/' + lang);
  }

  findOne(id?: number): Observable<FaqDto> {
    return this.http.get<FaqDto>(this.configService.configuration()?.API_URL + 'backend/faq/read/' + `${id}`);
  }

  save(body: FaqDto): Observable<any> {
    if (body.id) {
      body.UpdatedByUser = this.authService?.currentAdminValue.UserName;
    } else {
      body.CreatedByUser = this.authService?.currentAdminValue.UserName;
    }

    return this.http.post<any>(this.configService.configuration()?.API_URL + `backend/faq/${body.id ? 'update' : 'create'}`, body).pipe(map(d => {
      let logs: cbc_LogDTO = { Where: 'ICM_A_FAQ', SubType: `faq,${body.id ? 'update,' + body.id : 'create'}`, Memo: body.question };
      this.cbcLogService.cbc_LogToAuth(logs).subscribe(res => {
        console.log(res)
      });
      return d
    }));

  }

  sort(body: FaqDto[]): Observable<any> {
    return this.http.post<any>(this.configService.configuration()?.API_URL + 'backend/faq/sort', body);
  }

  remove(body: FaqDto): Observable<any> {
    return this.http.delete<any>(this.configService.configuration()?.API_URL + 'backend/banner/delete/' + body.id).pipe(map(d => {
      let logs: cbc_LogDTO = { Where: 'ICM_A_FAQ', SubType: `faq,delete,${body.id}`, Memo: body.question };
      this.cbcLogService.cbc_LogToAuth(logs).subscribe();
    }));
  }
}
