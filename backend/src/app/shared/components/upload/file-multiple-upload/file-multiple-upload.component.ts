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
import { ExhibitImgListDto } from '@core/entity/exhibit.entity';
import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag, CdkDragHandle, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { NgScrollbar } from 'ngx-scrollbar';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { fileUploadDto } from '@core/entity/file.entity';
import { MatDialog } from '@angular/material/dialog';
import { FileInfoEditComponent } from '../file-info-edit/file-info-edit.component';

@Component({
  selector: 'app-file-multiple-upload',
  standalone: true,
  imports: [MatButtonModule, MatProgressBarModule, NgClass, NgScrollbar, MatIconModule,
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    CdkDragPlaceholder,
    MatDialogContent,
  ],
  templateUrl: './file-multiple-upload.component.html',
  styleUrl: './file-multiple-upload.component.scss'
})
export class FileMultipleUploadComponent {

  $progress = signal(0);
  @Input() exhibitsId: number | null = null;
  @Input() files: ExhibitImgListDto[] = [];
  @Output() uploadFile = new EventEmitter<ExhibitImgListDto[]>();

  ExhibitsSearch = this.configService.configuration()?.EXHIBITS_IMG + 'Search/';
  error: any;

  constructor(private host: ElementRef<HTMLInputElement>,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private uploadServer: FileUploadService,
    private configService: ConfigService,
  ) { }

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);

    const formData = new FormData();
    formData.append('file', file as Blob, file?.name);
    this.uploadServer.searchUpload(formData, this.exhibitsId).pipe(tap((event: HttpEvent<any>) => {
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
          this.files.push(event.body.file);

          /*for (let i = 0; i < this.files.length; i++) {
            this.files[i].sort = i + 1;
          }
          this.uploadFile.emit(this.files);*/
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
    ).subscribe(

    );
  }


  @Confirmable()
  deleteFile(file: ExhibitImgListDto) {
    this.uploadServer.deleteSearchImg(file.imgID).subscribe(
      res => {
        this.files = this.files.filter(u => u !== file);
        /*
        for (let i = 0; i < this.files.length; i++) {
          this.files[i].sort = i + 1;
        }
        this.uploadFile.emit(this.files);*/
        this.toastr.info('圖片已刪除!');
      },
      err => { this.error = err; }
    );
  }

  @Confirmable({ html: '請認是否變更排序，調整排序後請按SAVE儲存。' })
  drop(event: any) {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
    this.files.forEach((e, index) => {
      e.sort = index;
    });
    this.uploadServer.searchImgSort(this.files).subscribe(res => {
      this.toastr.info('圖片排序調整完成!');
    })
  }

  editCall(row: ExhibitImgListDto) {
    const dialogRef = this.dialog.open(FileInfoEditComponent, {
      data: row,
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.files.forEach(d => {
          if (d.imgID === row.imgID) {
            d.imgName = res;
            this.uploadServer.searchImgInfo(d).subscribe(res => {
              this.toastr.info('圖片文字編輯儲存完成!');
            })
          }
        });
      }
    });
  }


}
