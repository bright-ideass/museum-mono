import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { cbc_LogDTO } from '@core/entity/admin.entity';
import { CbcLogService } from '@core/service/cbc-log.service';
import { AuthService } from '@core/service/auth.service';
import { LawDto } from '@core/entity/law.entity';
import { ConfigService } from '@config';
@Injectable({
  providedIn: 'root'
})
export class LawService {

  constructor(
    private http: HttpClient,
    private cbcLogService: CbcLogService,
    private authService: AuthService,
    private configService: ConfigService,
  ) { }


  findAll(lang?: string): Observable<LawDto[]> {
    return this.http.get<LawDto[]>(this.configService.configuration()?.API_URL + 'backend/law/list/' + lang);
  }

  findOne(id?: number): Observable<LawDto> {
    return this.http.get<LawDto>(this.configService.configuration()?.API_URL + 'backend/law/read/' + `${id}`);
  }

  save(body: LawDto): Observable<any> {
    if (body.ID) {
      body.UpdatedByUser = this.authService?.currentAdminValue.UserName;
    } else {
      body.CreatedByUser = this.authService?.currentAdminValue.UserName;
    }

    return this.http.post<any>(this.configService.configuration()?.API_URL + `backend/law/${body.ID ? 'update' : 'create'}`, body).pipe(map(d => {
      let logs: cbc_LogDTO = { Where: 'ICM_A_Law', SubType: `law,${body.ID ? 'update,' + body.ID : 'create'}`, Memo: body.LawName };
      this.cbcLogService.cbc_LogToAuth(logs).subscribe(res => {
        console.log(res)
      });
      return d
    }));

  }

  sort(body: LawDto[]): Observable<any> {
    return this.http.post<any>(this.configService.configuration()?.API_URL + 'backend/law/sort', body);
  }

  remove(body: LawDto): Observable<any> {
    return this.http.delete<any>(this.configService.configuration()?.API_URL + 'backend/law/delete/' + body.ID).pipe(map(d => {
      let logs: cbc_LogDTO = { Where: 'ICM_A_Law', SubType: `Law,delete,${body.ID}`, Memo: body.LawName };
      this.cbcLogService.cbc_LogToAuth(logs).subscribe();
    }));
  }

}
