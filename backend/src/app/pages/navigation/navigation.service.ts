import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { cbc_LogDTO } from '@core/entity/admin.entity';
import { CbcLogService } from '@core/service/cbc-log.service';
import { AuthService } from '@core/service/auth.service';
import { exhListDto, NavigationDto, NavigationExhSaveDto } from '@core/entity/navigation.entity';
import { ExhibitDto } from '@core/entity/exhibit.entity';
import { ConfigService } from '@config';
@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private http: HttpClient,
    private cbcLogService: CbcLogService,
    private authService: AuthService,
    private configService: ConfigService,
  ) { }


  findAll(): Observable<NavigationDto[]> {
    return this.http.get<NavigationDto[]>(this.configService.configuration()?.API_URL + 'backend/navigation/list');
  }

  findOne(id?: number): Observable<NavigationDto> {
    return this.http.get<NavigationDto>(this.configService.configuration()?.API_URL + 'backend/navigation/read/' + `${id}`);
  }

  save(body: NavigationDto): Observable<any> {
    if (body.NavigationId) {
      body.UpdatedByUser = this.authService?.currentAdminValue.UserName;
    } else {
      body.CreatedByUser = this.authService?.currentAdminValue.UserName;
    }

    return this.http.post<any>(this.configService.configuration()?.API_URL + `backend/navigation/${body.NavigationId ? 'update' : 'create'}`, body).pipe(map(d => {
      let logs: cbc_LogDTO = { Where: 'ICM_A_Navigation', SubType: `navigation,${body.NavigationId ? 'update,' + body.NavigationId : 'create'}`, Memo: body.Navigation };
      this.cbcLogService.cbc_LogToAuth(logs).subscribe(res => {
      });
      return d;
    }));
  }


  remove(body: NavigationDto): Observable<any> {
    return this.http.delete<any>(this.configService.configuration()?.API_URL + 'backend/navigation/delete/' + body.NavigationId).pipe(map(d => {
      let logs: cbc_LogDTO = { Where: 'ICM_A_Navigation', SubType: `navigation,delete,${body.NavigationId}`, Memo: body.Navigation };
      this.cbcLogService.cbc_LogToAuth(logs).subscribe();
    }));
  }

  exhibitList(id: number): Observable<exhListDto> {
    return this.http.get<exhListDto>(this.configService.configuration()?.API_URL + 'backend/navigation/exhlist/' + `${id}`)
  }

  exhibitListSave(id: number | undefined, body: NavigationExhSaveDto): Observable<any> {
    return this.http.post<any>(this.configService.configuration()?.API_URL + 'backend/navigation/exhlist/' + `${id}`, body)
  }

}
