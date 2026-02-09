import { Component, Inject } from '@angular/core';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { BannerService } from '../banner.service';
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
import { LangPipePipe } from '@shared/pipes/lang-pipe.pipe';

@Component({
  selector: 'app-banner-form',
  standalone: true,
  imports: [
    ValidatorErrorComponent,
    StateButtonComponent,
    FileOneUploadComponent,
    LangPipePipe,
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
  templateUrl: './banner-form.component.html',
  styleUrl: './banner-form.component.scss'
})
export class BannerFormComponent {
  id: number | undefined;
  action: string;
  dialogTitle: string;
  isForm: UntypedFormGroup;


  constructor(
    public dialogRef: MatDialogRef<BannerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public bannerService: BannerService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.action;
    this.isForm = this.createForm();
    if (this.action === 'edit') {
      this.dialogTitle = 'edit';
      this.loadData(data.id);
    } else {
      this.dialogTitle = 'New Record';
      this.isForm.get('lang')?.setValue(data.lang);
    }
  }

  onFile(event: string) {
    this.isForm.get('imgSrc')?.setValue(event);
    this.isForm.get('imgSrc')?.markAsDirty();
    this.isForm.get('imgSrc')?.markAsTouched();
  }

  createForm(): UntypedFormGroup {
    return this.fb.group({
      ID: [''],
      imgName: ['', [Validators.required, Validators.minLength(3)]],
      imgSrc: ['', [Validators.required]],
      imgUrl: [''],
      lang: [''],
      sortId: [null],
      state: [true]
    });
  }

  loadData(id: number) {
    this.bannerService.findOne(id).subscribe(res => {
      this.isForm.patchValue(res);
    });
  }

  confirmAdd() {
    this.bannerService.save(this.isForm.value).subscribe(res => {
      this.dialogRef.close(res);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



}
