import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { cbc_LogDTO } from '@core/entity/admin.entity';
import { CbcLogService } from '@core/service/cbc-log.service';
import { NewsDto } from '@core/entity/news.entity';
import { ConfigService } from '@config';
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient,
    private cbcLogService: CbcLogService,
    private configService: ConfigService,
  ) { }

  findAll(lang?: string): Observable<NewsDto[]> {
    return this.http.get<NewsDto[]>(this.configService.configuration()?.API_URL + 'backend/news/list/' + lang);
  }

  findOne(id?: number): Observable<NewsDto> {
    return this.http.get<NewsDto>(this.configService.configuration()?.API_URL + 'backend/news/read/' + `${id}`);
  }

  save(body: NewsDto): Observable<any> {
    return this.http.post<any>(this.configService.configuration()?.API_URL + `backend/news/${body.Id ? 'update' : 'create'}`, body).pipe(map(d => {
      let logs: cbc_LogDTO = { Where: 'ICM_A_News', SubType: `news,${body.Id ? 'update,' + body.Id : 'create'}`, Memo: body.title };
      this.cbcLogService.cbc_LogToAuth(logs).subscribe(res => {
        console.log(res)
      });
      return d
    }));

  }

  remove(body: NewsDto): Observable<any> {
    return this.http.delete<any>(this.configService.configuration()?.API_URL + 'backend/news/delete/' + body.Id).pipe(map(d => {
      let logs: cbc_LogDTO = { Where: 'ICM_A_News', SubType: `news,delete,${body.Id}`, Memo: body.title };
      this.cbcLogService.cbc_LogToAuth(logs).subscribe();
    }));
  }

}
