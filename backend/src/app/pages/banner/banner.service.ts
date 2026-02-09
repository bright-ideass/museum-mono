import { Injectable } from '@angular/core';
import { BannerDto } from '@core/entity/banner.entity';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { cbc_LogDTO } from '@core/entity/admin.entity';
import { CbcLogService } from '@core/service/cbc-log.service';
import { AuthService } from '@core/service/auth.service';
import { ConfigService } from '@config';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(
    private http: HttpClient,
    private cbcLogService: CbcLogService,
    private authService: AuthService,
    private configService: ConfigService,
  ) { }

  findAll(lang?: string): Observable<BannerDto[]> {
    return this.http.get<BannerDto[]>(this.configService.configuration()?.API_URL + 'backend/banner/list/' + lang);
  }

  findOne(id?: number): Observable<BannerDto> {
    return this.http.get<BannerDto>(this.configService.configuration()?.API_URL + 'backend/banner/read/' + `${id}`);
  }

  save(body: BannerDto): Observable<any> {
    if (body.ID) {
      body.UpdatedByUser = this.authService?.currentAdminValue.UserName;
    } else {
      body.CreatedByUser = this.authService?.currentAdminValue.UserName;
    }

    return this.http.post<any>(this.configService.configuration()?.API_URL + `backend/banner/${body.ID ? 'update' : 'create'}`, body).pipe(map(d => {
      let logs: cbc_LogDTO = { Where: 'ICM_A_WebBanner', SubType: `banner,${body.ID ? 'update,' + body.ID : 'create'}`, Memo: body.imgName };
      this.cbcLogService.cbc_LogToAuth(logs).subscribe(res => {
        console.log(res)
      });
      return d
    }));
  }

  sort(body: BannerDto[]): Observable<any> {
    return this.http.post<any>(this.configService.configuration()?.API_URL + 'backend/banner/sort', body);
  }

  remove(body: BannerDto): Observable<any> {
    return this.http.delete<any>(this.configService.configuration()?.API_URL + 'backend/banner/delete/' + body.ID).pipe(map(d => {
      let logs: cbc_LogDTO = { Where: 'ICM_A_WebBanner', SubType: `banner,delete,${body.ID}`, Memo: body.imgName };
      this.cbcLogService.cbc_LogToAuth(logs).subscribe();
    }));
  }


}
