import { Component, Inject, signal } from '@angular/core';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ExhibitImgListDto } from '@core/entity/exhibit.entity';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-file-info-edit',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogContent,
    MatDialogClose,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './file-info-edit.component.html',
  styleUrl: './file-info-edit.component.scss'
})
export class FileInfoEditComponent {
  dialogTitle = '編輯圖說名稱';
  fileInfo = '';
  file: ExhibitImgListDto;

  constructor(
    public dialogRef: MatDialogRef<FileInfoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.file = data;
    this.fileInfo = data.imgName;
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.dialogRef.close(this.fileInfo);
  }
}
