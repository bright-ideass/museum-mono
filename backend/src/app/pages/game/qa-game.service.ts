import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CbcLogService } from '@core/service/cbc-log.service';
import { AuthService } from '@core/service/auth.service';
import { environment } from 'environments/environment';
import { cbc_LogDTO } from '@core/entity/admin.entity';
import { QaGameDto, QaGameItemDto } from '@core/entity/game.entity';
import { ConfigService } from '@config';
@Injectable({
  providedIn: 'root'
})
export class QaGameService {

  constructor(
    private http: HttpClient,
    private cbcLogService: CbcLogService,
    private authService: AuthService,
    private configService: ConfigService,
  ) { }


  findAllQa(): Observable<QaGameDto[]> {
    return this.http.get<QaGameDto[]>(this.configService.configuration()?.API_URL + 'backend/game/qa/list');
  }

  findOneQa(id?: number): Observable<QaGameDto> {
    return this.http.get<QaGameDto>(this.configService.configuration()?.API_URL + 'backend/game/qa/read/' + `${id}`);
  }

  saveQa(body: QaGameDto): Observable<any> {
    if (body.ID) {
      body.UpdatedByUser = this.authService?.currentAdminValue.UserName;
    } else {
      body.CreatedByUser = this.authService?.currentAdminValue.UserName;
    }

    return this.http.post<any>(this.configService.configuration()?.API_URL + `backend/game/qa/${body.ID ? 'update' : 'create'}`, body).pipe(map(d => {
      let logs: cbc_LogDTO = { Where: 'ICM_A_QAGame', SubType: `qa game,${body.ID ? 'update,' + body.ID : 'create'}`, Memo: body.Title };
      this.cbcLogService.cbc_LogToAuth(logs).subscribe(res => {
        console.log(res)
      });
      return d
    }));
  }

  removeQa(body: QaGameDto): Observable<any> {
    return this.http.delete<any>(this.configService.configuration()?.API_URL + 'backend/game/qa/delete/' + body.ID).pipe(map(d => {
      let logs: cbc_LogDTO = { Where: 'ICM_A_QAGame', SubType: `qa game ,delete,${body.ID}`, Memo: body.Title };
      this.cbcLogService.cbc_LogToAuth(logs).subscribe();
    }));
  }

  findAllItem(): Observable<QaGameDto[]> {
    return this.http.get<QaGameDto[]>(this.configService.configuration()?.API_URL + 'backend/game/qaItem/list');
  }

  findOneItem(id?: number): Observable<QaGameDto> {
    return this.http.get<QaGameDto>(this.configService.configuration()?.API_URL + 'backend/game/qaItem/read/' + `${id}`);
  }

  saveItem(body: QaGameItemDto): Observable<any> {
    if (body.ID) {
      body.UpdatedByUser = this.authService?.currentAdminValue.UserName;
    } else {
      body.CreatedByUser = this.authService?.currentAdminValue.UserName;
    }

    return this.http.post<any>(this.configService.configuration()?.API_URL + `backend/game/qaItem/${body.ID ? 'update' : 'create'}`, body).pipe(map(d => {
      let logs: cbc_LogDTO = { Where: 'ICM_A_QAGameItem', SubType: `qa game item,${body.ID ? 'update,' + body.ID : 'create'}`, Memo: body.Title };
      this.cbcLogService.cbc_LogToAuth(logs).subscribe(res => {
        console.log(res)
      });
      return d
    }));
  }

  removeItem(body: QaGameDto): Observable<any> {
    return this.http.delete<any>(this.configService.configuration()?.API_URL + 'backend/game/qaItem/delete/' + body.ID).pipe(map(d => {
      let logs: cbc_LogDTO = { Where: 'ICM_A_QAGameItem', SubType: `qa game item,delete,${body.ID}`, Memo: body.Title };
      this.cbcLogService.cbc_LogToAuth(logs).subscribe();
    }));
  }

}
