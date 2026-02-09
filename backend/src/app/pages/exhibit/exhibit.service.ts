import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { cbc_LogDTO } from '@core/entity/admin.entity';
import { CbcLogService } from '@core/service/cbc-log.service';
import { AuthService } from '@core/service/auth.service';
import { ExhibitDto, ExhibitImgListDto, ExhibitPeriodTypeDto, ExhibitPreviewDto } from '@core/entity/exhibit.entity';
import { ConfigService } from '@config';

@Injectable({
  providedIn: 'root'
})
export class ExhibitService {

  constructor(
    private http: HttpClient,
    private cbcLogService: CbcLogService,
    private authService: AuthService,
    private configService: ConfigService,
  ) { }

  findPeriodType(id: string): Observable<ExhibitPeriodTypeDto[]> {
    return this.http.get<ExhibitPeriodTypeDto[]>(this.configService.configuration()?.API_URL + 'backend/exhibit/code/' + `${id}`);
  }

  findPeriodSubType(id: number | null): Observable<ExhibitPeriodTypeDto[]> {
    return this.http.get<ExhibitPeriodTypeDto[]>(this.configService.configuration()?.API_URL + 'backend/exhibit/subCode/' + `${id}`);
  }


  findAll(): Observable<ExhibitDto[]> {
    return this.http.get<ExhibitDto[]>(this.configService.configuration()?.API_URL + 'backend/exhibit/list');
  }

  findOne(id?: number): Observable<ExhibitDto> {
    return this.http.get<ExhibitDto>(this.configService.configuration()?.API_URL + 'backend/exhibit/read/' + `${id}`);
  }

  findPreview(id?: number): Observable<ExhibitPreviewDto> {
    return this.http.get<ExhibitPreviewDto>(this.configService.configuration()?.API_URL + 'backend/exhibit/preview/' + `${id}`);
  }

  save(body: ExhibitDto): Observable<any> {
    if (body.ExhibitsId) {
      body.UpdatedByUser = this.authService?.currentAdminValue.UserName;
    } else {
      body.CreatedByUser = this.authService?.currentAdminValue.UserName;
    }

    return this.http.post<any>(this.configService.configuration()?.API_URL + `backend/exhibit/${body.ExhibitsId ? 'update' : 'create'}`, body).pipe(map(d => {
      let logs: cbc_LogDTO = { Where: 'ICM_A_Exhibits', SubType: `exhibit,${body.ExhibitsId ? 'update,' + body.ExhibitsId : 'create'}`, Memo: body.ExhibitsName };
      this.cbcLogService.cbc_LogToAuth(logs).subscribe(res => {
        console.log(res)
      });
      return d;
    }));
  }


  remove(body: ExhibitDto): Observable<any> {
    return this.http.delete<any>(this.configService.configuration()?.API_URL + 'backend/exhibit/delete/' + body.ExhibitsId).pipe(map(d => {
      let logs: cbc_LogDTO = { Where: 'ICM_A_Exhibits', SubType: `exhibit,delete,${body.ExhibitsId}`, Memo: body.ExhibitsName };
      this.cbcLogService.cbc_LogToAuth(logs).subscribe();
    }));
  }

  findImgList(id?: number): Observable<ExhibitImgListDto[]> {
    return this.http.get<ExhibitImgListDto[]>(this.configService.configuration()?.API_URL + 'backend/upload/imgs/' + `${id}`);
  }
}
