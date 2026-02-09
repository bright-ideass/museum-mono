import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { tap } from 'rxjs/operators';
import { ExhibitImgListDto } from '@core/entity/exhibit.entity';
import { ConfigService } from '@config';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient,
    private configService: ConfigService,
    ) { }


  searchUpload(data: any, id: number | null): Observable<any> {
    return this.http.post<any>(this.configService.configuration()?.API_URL + `backend/upload/imgs/search/${id}`, data, {
      reportProgress: true,
      observe: 'events',
    });
  }

  searchImgSort(body: ExhibitImgListDto[]): Observable<any> {
    return this.http.post<any>(this.configService.configuration()?.API_URL + `backend/upload/imgsSort`, body);
  }

  searchImgInfo(body: ExhibitImgListDto): Observable<any> {
    return this.http.post<any>(this.configService.configuration()?.API_URL + `backend/upload/imgsInfo`, body);
  }

  deleteSearchImg(id: number | undefined): Observable<any> {
    return this.http.delete<any>(this.configService.configuration()?.API_URL + `backend/upload/imgs/${id}`).pipe(
      tap(_ => console.log(`Delete File is FileId=${id}`))
    );
  }

  imageUpload(data: any, type: string): Observable<any> {
    return this.http.post<any>(this.configService.configuration()?.API_URL + 'backend/upload/image/' + type, data, {
      reportProgress: true,
      observe: 'events',
    });
  }

  gameUpload(data: any, id: string): Observable<any> {
    return this.http.post<any>(this.configService.configuration()?.API_URL + 'backend/upload/game/' + id, data, {
      reportProgress: true,
      observe: 'events',
    });
  }

}
