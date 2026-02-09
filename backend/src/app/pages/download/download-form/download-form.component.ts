import { Component, Inject } from '@angular/core';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ValidatorErrorComponent } from '@shared/components/validator-error/validator-error.component';
import { StateButtonComponent } from '@shared/components/state-button/state-button.component';
import { CommonModule } from '@angular/common';
import { FileOneUploadComponent } from '@shared/components/upload/file-one-upload/file-one-upload.component';
import { DownloadService } from '../download.service';
import { MediaTypePipe } from '@shared/pipes/media-type.pipe';

@Component({
  selector: 'app-download-form',
  standalone: true,
  imports: [
    MediaTypePipe,
    ValidatorErrorComponent,
    StateButtonComponent,
    FileOneUploadComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogClose,
    CommonModule
  ],
  templateUrl: './download-form.component.html',
  styleUrl: './download-form.component.scss'
})
export class DownloadFormComponent {

  id: number | undefined;
  mediaType: string | undefined;
  action: string;
  dialogTitle: string;
  isForm: UntypedFormGroup;

  constructor(
    public dialogRef: MatDialogRef<DownloadFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public downloadService: DownloadService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.action;
    this.mediaType = data.mediaType;
    this.isForm = this.createForm();
    if (this.action === 'edit') {
      this.dialogTitle = 'edit';
      this.loadData(data.id);
    } else {
      this.dialogTitle = 'New Record';
      this.isForm.get('mediaType')?.setValue(data.mediaType);
    }
  }


  onFile(event: string, type: string) {
    this.isForm.get(type)?.setValue(event);
    this.isForm.get(type)?.markAsDirty();
    this.isForm.get(type)?.markAsTouched();
  }

  createForm(): UntypedFormGroup {
    return this.fb.group({
      ID: [null],
      mediaType: [null, [Validators.required]],
      Title: [null, [Validators.required, Validators.minLength(3)]],
      content: [null],
      startDate: [new Date(), Validators.required],
      endDate: [null],
      File1: [null],
      File2: [null],
      File3: [null],
      File4: [null],
      File5: [null],
      state: [true]
    });
  }

  loadData(id: number) {
    this.downloadService.findOne(id).subscribe(res => {
      this.isForm.patchValue(res);
    });
  }

  confirmAdd() {
    this.downloadService.save(this.isForm.value).subscribe(res => {
      this.dialogRef.close(res);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
