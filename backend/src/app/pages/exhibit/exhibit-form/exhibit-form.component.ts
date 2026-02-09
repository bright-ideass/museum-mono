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
import { ExhibitService } from '../exhibit.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ExhibitDocTypePipe, ExhibitUseTypePipe, ExhibitTypePipe } from '@shared/pipes/exhibit-use-type.pipe';
import { FileOneUploadComponent } from '@shared/components/upload/file-one-upload/file-one-upload.component';
import { ExhibitPeriodSelectComponent } from '../exhibit-period-select/exhibit-period-select.component';

@Component({
  selector: 'app-exhibit-form',
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
    ExhibitTypePipe,
    ExhibitUseTypePipe,
    ExhibitDocTypePipe,
    FileOneUploadComponent,
    ExhibitPeriodSelectComponent
  ],
  templateUrl: './exhibit-form.component.html',
  styleUrl: './exhibit-form.component.scss',

})
export class ExhibitFormComponent {
  imgDpiType = signal(['75', '300', '600']);
  objType = signal(['直式', '橫式', '其他']);
  exhibitsType = signal([1, 2]);
  useType = signal([1, 2, 3]);
  exhibitsDoc = signal(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']);


  action: string;
  dialogTitle: string;
  isForm: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<ExhibitFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public exhibitService: ExhibitService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.action;
    this.isForm = this.createForm();

    if (this.action === 'edit') {
      this.dialogTitle = 'edit';
      console.log('data.id:', data.id)
      this.loadData(data.id);
    } else {
      this.dialogTitle = 'New Record';
    }
  }
  onSelect(event: any, type: string) {
    this.isForm.get(type)?.setValue(event);
    this.isForm.get(type)?.markAsDirty();
    this.isForm.get(type)?.markAsTouched();
    if (type === 'PeriodID') {
      this.isForm.get('PeriodTypeID')?.setValue(null);
      this.isForm.get('PeriodTypeID')?.markAsDirty();
      this.isForm.get('PeriodTypeID')?.markAsTouched();
    }
  }
  onFile(event: string, fileType: string) {
    this.isForm.get(fileType)?.setValue(event);
    this.isForm.get(fileType)?.markAsDirty();
    this.isForm.get(fileType)?.markAsTouched();
  }

  ExhibitsTypeOnSelect(value: number) {
    if (value === 2) {
      this.isForm.get('Obj_Type')?.setValue('其他')
    } else { this.isForm.get('Obj_Type')?.setValue('直式') }
  }

  createForm(): UntypedFormGroup {
    return this.fb.group({
      ExhibitsId: [null],
      InputId: [null],
      InputNo: [null],
      ExhibitsName: [null, [Validators.required, Validators.minLength(2)]],
      ShowStarttime: [new Date(), [Validators.required]],
      ShowEndtime: [null],
      onForever: [false],
      PeriodID: [null, [Validators.required]],
      PeriodTypeID: [null, [Validators.required]],
      ExhibitsType: [1],
      ExhibitsDoc: ['1'],
      SendingCount: [null],
      Dollar: [null],
      Area: [null],
      IssueTimeDC: [null],
      PlateYearDC: [null],
      IssueTime: [null],
      PlateYear: [null],
      size_L: [null],
      size_W: [null],
      size_H: [null],
      Obj_Type: ['直式'],
      Obj_color1: [null],
      Obj_color2: [null],
      Weight: [null],
      Diameter: [null],
      Exhibits_Content: [null],
      Keywords: [null],
      Exhibits_Story: [null],
      ShowWeb: [null],
      UseType: [1],
      Location: [null],
      ImgDpi: ['75'],
      InvalidDate: [null],
      EndUseDate: [null],
      CC: [null],
      // FakeWeb: [null],
      Note: [null],
      imgDescr1: [null],
      imgDescr2: [null],
      imgDescr3: [null],
      haveEnlarge: [null],
      haveSurround: [null],
      haveThumb: [null],
      ImgName: [null],
      SurroundSwf: [null],
      EnlargeImg1: [null],
      EnlargeImg2: [null],
      ThumbnailImg: [null],
      // WebImg: [null],
      TimelineImg: [null],
      // Voice: [null],
      // RelatedLink: [null],
      // ExtContent: [null],
      obj_material: [null],
      ExhibitsVers: [null],
      // webType0: [null],
      // webSubType0: [null],
      // showWeb0: [null],
      // webType1: [null],
      // webSubType1: [null],
      // showWeb1: [null],
      // webType2: [null],
      // webSubType2: [null],
      // showWeb2: [null],
      // ebook: [null],
      IsPublish: [1, [Validators.required]],
      dollarNum: [null],
      en: this.fb.group({
        ExhibitsId: [null],
        ExhibitsName: [null],
        IssueTime: [null],
        PlateYear: [null],
        size_L: [null],
        size_W: [null],
        size_H: [null],
        Dollar: [null],
        Area: [null],
        Obj_Type: [null],
        Obj_color1: [null],
        Obj_color2: [null],
        Weight: [null],
        Diameter: [null],
        imgDescr1: [null],
        imgDescr2: [null],
        imgDescr3: [null],
        WebImg: [null],
        TimelineImg: [null],
        obj_material: [null],
        ExhibitsVers: [null],
        ebook: [null],
        Exhibits_Content: [null],
        SendingCount: [null],

      })
    });
  }

  loadData(id: number) {
    this.exhibitService.findOne(id).subscribe(res => {
      this.isForm.patchValue(res);
      this.dialogTitle = '品名：' + res.ExhibitsName;
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
