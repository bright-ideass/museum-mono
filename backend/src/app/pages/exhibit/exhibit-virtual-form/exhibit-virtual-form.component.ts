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
import { FileOneUploadComponent } from '@shared/components/upload/file-one-upload/file-one-upload.component';
import { CommonModule } from '@angular/common';
import { ExhibitService } from '../exhibit.service';

@Component({
  selector: 'app-exhibit-virtual-form',
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
    CommonModule,
    FileOneUploadComponent
  ],
  templateUrl: './exhibit-virtual-form.component.html',
  styleUrl: './exhibit-virtual-form.component.scss'
})
export class ExhibitVirtualFormComponent {

  id: number | undefined;
  action: string;
  dialogTitle: string;
  isForm: UntypedFormGroup;

  constructor(
    public dialogRef: MatDialogRef<ExhibitVirtualFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public exhibitService: ExhibitService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.action;
    this.isForm = this.createForm();
    this.dialogTitle = 'edit';
    this.loadData(data.id);
  }

  onFile(event: string, fileType: string) {
    this.isForm.get(fileType)?.setValue(event);
    this.isForm.get(fileType)?.markAsDirty();
    this.isForm.get(fileType)?.markAsTouched();
  }

  createForm(): UntypedFormGroup {
    return this.fb.group({
      ExhibitsId: [null],
      Voice: [null],
      RelatedLink: [null],
      ExtContent: [null],
      googleMap: [null]
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
