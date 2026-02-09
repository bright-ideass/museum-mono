import { Injectable } from '@angular/core';
import { cbc_LogDTO } from '@core/entity/admin.entity';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { format } from "date-fns";
import { ConfigService } from '@config';
@Injectable({
  providedIn: 'root'
})
export class CbcLogService {

  constructor(private http: HttpClient,
    private authService: AuthService,
    private configService: ConfigService,) { }

  cbc_LogToAuth(logs: cbc_LogDTO): Observable<any> {
    let admin = this.authService.currentAdminValue;
    // logs.AuthSessionToken = admin.AuthSessionToken;
    logs.Level = 3;
    logs.Type = 1;
    logs.What = admin.UserName + ',' + logs.SubType + ',' + logs.Memo + ',' + format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const data = new HttpParams({
      fromObject: {
        Where: logs.Where,
        Level: logs.Level,
        Type: logs.Type,
        SubType: logs.SubType,
        What: logs.What,
        Memo: logs.Memo,
        // AuthSessionToken: admin.AuthSessionToken
      }
    })

    return this.cbc_LogToAuthToBackend(logs)
    /*
    if (environment.saveCbcLog) {
      return this.http.post<any>(environment.cbc_admin_logs, data, { headers: headers })
    } else {
      return this.http.get<any>(this.configService.configuration()?.API_URL);
    }*/
  }

  cbc_LogToAuthToBackend(logs: cbc_LogDTO): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const data = new HttpParams({
      fromObject: {
        Where: logs.Where,
        Level: logs.Level || 0,
        Type: logs.Type || 0,
        SubType: logs.SubType,
        What: logs.What || '',
        Memo: logs.Memo,
        AuthSessionToken: logs.AuthSessionToken || ''
      }
    })
    return this.http.post<any>(this.configService.configuration()?.API_URL + 'backend/log/save', data, { headers: headers })

  }

  getLogs(): Observable<cbc_LogDTO[]> {
    return this.http.get<cbc_LogDTO[]>(this.configService.configuration()?.API_URL + 'backend/log/logs');
  }

}

