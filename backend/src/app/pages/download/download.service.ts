import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { cbc_LogDTO } from '@core/entity/admin.entity';
import { CbcLogService } from '@core/service/cbc-log.service';
import { AuthService } from '@core/service/auth.service';
import { DownloadDto } from '@core/entity/download.entity';
import { ConfigService } from '@config';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(
    private http: HttpClient,
    private cbcLogService: CbcLogService,
    private authService: AuthService,
    private configService: ConfigService,
  ) { }


  findAll(mediaType?: string): Observable<DownloadDto[]> {
    return this.http.get<DownloadDto[]>(this.configService.configuration()?.API_URL + `backend/download/list/${mediaType}`  );
  }

  findOne(id?: number): Observable<DownloadDto> {
    return this.http.get<DownloadDto>(this.configService.configuration()?.API_URL + 'backend/download/read/' + `${id}`);
  }

  save(body: DownloadDto): Observable<any> {
    if (body.ID) {
      body.UpdatedByUser = this.authService?.currentAdminValue.UserName;
    } else {
      body.CreatedByUser = this.authService?.currentAdminValue.UserName;
    }

    return this.http.post<any>(this.configService.configuration()?.API_URL + `backend/download/${body.ID ? 'update' : 'create'}`, body).pipe(map(d => {
      let logs: cbc_LogDTO = { Where: 'ICM_A_DataDownload', SubType: `download,${body.ID ? 'update,' + body.ID : 'create'}`, Memo: body.Title };
      this.cbcLogService.cbc_LogToAuth(logs).subscribe(res => {
        console.log(res)
      });
      return d
    }));
  }
  remove(body: DownloadDto): Observable<any> {
    return this.http.delete<any>(this.configService.configuration()?.API_URL + 'backend/download/delete/' + body.ID).pipe(map(d => {
      let logs: cbc_LogDTO = { Where: 'ICM_A_DataDownload', SubType: `download,delete,${body.ID}`, Memo: body.Title };
      this.cbcLogService.cbc_LogToAuth(logs).subscribe();
    }));
  }
}
