import { ExhibitService } from './../exhibit.service';
import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ExhibitImgListDto } from '@core/entity/exhibit.entity';
import { FileMultipleUploadComponent } from '@shared/components/upload/file-multiple-upload/file-multiple-upload.component';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';

@Component({
  selector: 'app-exhibit-img-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogContent,
    MatDialogClose,
    CommonModule,
    FileMultipleUploadComponent,
    FileUploadComponent
  ],
  templateUrl: './exhibit-img-form.component.html',
  styleUrl: './exhibit-img-form.component.scss'
})
export class ExhibitImgFormComponent {

  action: string;
  dialogTitle: string;
  imgs = signal<ExhibitImgListDto[]>([])
  exhibitsId: number | null;
  constructor(
    public dialogRef: MatDialogRef<ExhibitImgFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public exhibitService: ExhibitService,
  ) {
    this.action = data.action;
    this.dialogTitle = data.ExhibitsName
    this.exhibitsId = data.ExhibitsId;
    this.loadData(data.ExhibitsId);
  }

  loadData(id: number) {
    this.exhibitService.findImgList(id).subscribe(res => {
      this.imgs.set(res)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
