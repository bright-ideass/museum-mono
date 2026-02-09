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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ValidatorErrorComponent } from '@shared/components/validator-error/validator-error.component';
import { StateButtonComponent } from '@shared/components/state-button/state-button.component';
import { FileOneUploadComponent } from '@shared/components/upload/file-one-upload/file-one-upload.component';
import { CommonModule } from '@angular/common';
import { ExhibitService } from '../exhibit.service';
import { ExhibitPeriodSelectComponent } from '../exhibit-period-select/exhibit-period-select.component';

@Component({
  selector: 'app-exhibit-digital-form',
  standalone: true,
  imports: [
    ValidatorErrorComponent,
    StateButtonComponent,
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
    MatCheckboxModule,
    CommonModule,
    FileOneUploadComponent,
    ExhibitPeriodSelectComponent
  ],
  templateUrl: './exhibit-digital-form.component.html',
  styleUrl: './exhibit-digital-form.component.scss'
})
export class ExhibitDigitalFormComponent {

  id: number | undefined;
  action: string;
  dialogTitle: string;
  isForm: UntypedFormGroup;

  constructor(
    public dialogRef: MatDialogRef<ExhibitDigitalFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public exhibitService: ExhibitService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.action;
    this.isForm = this.createForm();
    this.dialogTitle = 'edit';
    this.loadData(data.id);
  }

  onSelect(event: any, type: string) {
    this.isForm.get(type)?.setValue(event);
    this.isForm.get(type)?.markAsDirty();
    this.isForm.get(type)?.markAsTouched();
    if (type === 'webType0') {
      this.isForm.get('webSubType0')?.setValue(null);
      this.isForm.get('webSubType0')?.markAsDirty();
      this.isForm.get('webSubType0')?.markAsTouched();
    }
  }

  onFile(event: string, fileType: string) {
    if (fileType === 'en_webImg') {
      console.log('en_webImg:', event)
      this.isForm.get('en')?.get('WebImg')?.setValue(event);
      this.isForm.get('en')?.get('WebImg')?.markAsDirty();
      this.isForm.get('en')?.get('WebImg')?.markAsTouched();
      return;
    }

    this.isForm.get(fileType)?.setValue(event);
    this.isForm.get(fileType)?.markAsDirty();
    this.isForm.get(fileType)?.markAsTouched();
  }

  createForm(): UntypedFormGroup {
    return this.fb.group({
      ExhibitsId: [null],
      webType0: [null],
      webSubType0: [null],
      showWeb0: [null],
      order0: [null],

      webType1: [null],
      webSubType1: [null],
      showWeb1: [null],
      order1: [null],

      webType2: [null],
      webSubType2: [null],
      showWeb2: [null],
      order2: [null],

      FakeWeb: [null],
      WebImg: [null],
      ebook: [null],
      URLlink: [null],
      skuBrowsing: [null],
      en: this.fb.group({
        ExhibitsId: [null],
        FakeWeb: [null],
        WebImg: [null],
      })
    });
  }


  loadData(id: number) {
    this.exhibitService.findOne(id).subscribe(res => {
      this.dialogTitle = '品名：' + res.ExhibitsName;
      this.isForm.patchValue(res);
    });
  }

  confirmAdd() {
    this.exhibitService.save(this.isForm.value).subscribe(res => {
      this.dialogRef.close(res);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
