import { Component, ElementRef, HostListener, Input, Output, signal, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FileUploadService } from '../file-upload.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { NgClass } from '@angular/common';
import { ConfigService } from '@config';
import { Confirmable } from '@core/decorator/confirmable.decorator';
import { FileNamePipePipe, FileTypePipePipe } from '@shared/pipes/file-type-pipe.pipe';


@Component({
  selector: 'app-shared-file-one-upload',
  templateUrl: './file-one-upload.component.html',
  styleUrl: './file-one-upload.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatProgressBarModule, NgClass, FileNamePipePipe, FileTypePipePipe],

})
export class FileOneUploadComponent {

  imageType = ['bannerImg', 'newsImg', 'bookFile1', 'media1', 'media2', 'media3', 'media4', 'media5',
    'studyImg', 'videoImg', 'gameImg', 'gameQa', 'gameItemImg', 'gameQaBk', 'enlargeImg1', 'enlargeImg2', 'thumbnailImg', 'webImg', 'eBook', 'VR_Img'
  ];

  public file: File | null = null;
  @Input() type: string | null = null;
  @Input() id?: number | null = null;
  @Input() filePath: string | null | undefined;
  @Output() uploadFile = new EventEmitter<any>();
  $progress = signal(0);
  ExhibitsImg = this.configService.configuration()?.EXHIBITS_IMG + 'web/';
  ExhibitsGame = this.configService.configuration()?.EXHIBITS_IMG + 'game/';
  ExhibitsEnlarge = this.configService.configuration()?.EXHIBITS_IMG + 'Enlarge/';
  ExhibitsThumbnail = this.configService.configuration()?.EXHIBITS_IMG + 'Thumbnail/';
  ExhibitsWebImg = this.configService.configuration()?.EXHIBITS_IMG + 'WebImg/';
  ExhibitsEBook = this.configService.configuration()?.EXHIBITS_IMG + 'PDF/';
  ExhibitsVR = this.configService.configuration()?.EXHIBITS_IMG + 'uploadImg/';

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {

    const file = event && event.item(0);
    this.file = file;
    // console.log(file)
    const formData = new FormData();
    formData.append('file', file as Blob, file?.name);
    this.uploadServer.imageUpload(formData, this.type || '').pipe(tap((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          break;
        case HttpEventType.ResponseHeader:
          break;
        case HttpEventType.UploadProgress:
          const progress = Math.round((event.loaded || 1) / (event.total || 1) * 100);
          this.$progress.set(progress);
          break;
        case HttpEventType.Response:
          if (event.body?.file?.path) {
            this.filePath = this.sanitizeFilePath(event.body.file.path);
            this.uploadFile.emit(this.filePath);
          }
          setTimeout(() => {
            this.$progress.set(0);
          }, 500);
      }
    }),
      catchError((e) => {
        this.$progress.set(0);
        console.log('error:', e);
        throw e;
      })
    ).subscribe();
  }

  sanitizeFilePath(filePath: string): string {
    const filteredFilePath = filePath.replace(/[^\w\s.-]/gi, '');
    return filteredFilePath;
  }

  constructor(private host: ElementRef<HTMLInputElement>,
    private uploadServer: FileUploadService,
    private configService: ConfigService,
  ) { }


  @Confirmable()
  deleteFile() {
    this.host.nativeElement.value = '';
    this.filePath = null;
    this.file = null;
    this.uploadFile.emit(this.filePath);
  }


}
