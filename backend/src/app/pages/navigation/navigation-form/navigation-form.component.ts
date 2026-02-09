import { Component, Inject, signal } from '@angular/core';
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
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FileOneUploadComponent } from '@shared/components/upload/file-one-upload/file-one-upload.component';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-navigation-form',
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
    MatTabsModule,
    MatCheckboxModule,
    FileOneUploadComponent,
  ],
  templateUrl: './navigation-form.component.html',
  styleUrl: './navigation-form.component.scss'
})
export class NavigationFormComponent {

  cssType = signal(['type-A', 'type-B', 'type-C']);
  action: string;
  dialogTitle: string;
  isForm: UntypedFormGroup;

  constructor(
    public dialogRef: MatDialogRef<NavigationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public navigationService: NavigationService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.action;
    this.isForm = this.createForm();

    if (this.action === 'edit') {
      this.dialogTitle = 'edit';
      this.loadData(data.id);
    } else {
      this.dialogTitle = 'New Record';
    }
  }

  onFile(event: string, fileType: string) {
    this.isForm.get(fileType)?.setValue(event);
    this.isForm.get(fileType)?.markAsDirty();
    this.isForm.get(fileType)?.markAsTouched();
  }

  createForm(): UntypedFormGroup {
    return this.fb.group({
      NavigationId: [null],
      Navigation: [null, [Validators.required, Validators.minLength(2)]],
      showDate1: [null],
      showDate2: [null],
      note: [null],
      NavigationType: ['1', [Validators.required]],
      // ImgSrcMain1: [null],
      // ImgSrcMain: [null],
      ImgSrc: [null],
      room1_Name: [null],
      room1_desc: [null],
      room1_img0: [null],
      room1_voice: [null],
      room2_Name: [null],
      room2_desc: [null],
      room2_img0: [null],
      //room2_img1: [null],
      // room2_img2: [null],
      // room2_img3: [null],
      // room2_img4: [null],
      room2_voice: [null],
      room3_Name: [null],
      room3_desc: [null],
      room3_img0: [null],
      // room3_img1: [null],
      // room3_img2: [null],
      // room3_img3: [null],
      // room3_img4: [null],
      room3_voice: [null],
      mainVoice: [null],
      CssType: [null],
      state: [true, [Validators.required]],
    });
  }

  loadData(id: number) {
    this.navigationService.findOne(id).subscribe(res => {
      this.dialogTitle = '展覽名稱：' + res.Navigation;
      this.isForm.patchValue(res);
    });
  }

  confirmAdd() {
    this.navigationService.save(this.isForm.value).subscribe(res => {
      this.dialogRef.close(res);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
