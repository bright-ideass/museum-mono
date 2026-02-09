import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { cbc_LogDTO } from '@core/entity/admin.entity';
import { CbcLogService } from '@core/service/cbc-log.service';
import { AuthService } from '@core/service/auth.service';
import { LinkDto } from '@core/entity/link.entity';
import { ConfigService } from '@config';
@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(
    private http: HttpClient,
    private cbcLogService: CbcLogService,
    private authService: AuthService,
    private configService: ConfigService,
  ) { }


  findAll(): Observable<LinkDto[]> {
    return this.http.get<LinkDto[]>(this.configService.configuration()?.API_URL + 'backend/link/list');
  }

  findOne(id?: number): Observable<LinkDto> {
    return this.http.get<LinkDto>(this.configService.configuration()?.API_URL + 'backend/link/read/' + `${id}`);
  }

  save(body: LinkDto): Observable<any> {
    if (body.Id) {
      body.UpdatedByUser = this.authService?.currentAdminValue.UserName;
    } else {
      body.CreatedByUser = this.authService?.currentAdminValue.UserName;
    }

    return this.http.post<any>(this.configService.configuration()?.API_URL + `backend/link/${body.Id ? 'update' : 'create'}`, body).pipe(map(d => {
      let logs: cbc_LogDTO = { Where: 'ICM_A_Link', SubType: `link,${body.Id ? 'update,' + body.Id : 'create'}`, Memo: body.Title };
      this.cbcLogService.cbc_LogToAuth(logs).subscribe(res => {
        console.log(res)
      });
      return d;
    }));
  }


  remove(body: LinkDto): Observable<any> {
    return this.http.delete<any>(this.configService.configuration()?.API_URL + 'backend/link/delete/' + body.Id).pipe(map(d => {
      let logs: cbc_LogDTO = { Where: 'ICM_A_Link', SubType: `link,delete,${body.Id}`, Memo: body.Title };
      this.cbcLogService.cbc_LogToAuth(logs).subscribe();
    }));
  }

}
