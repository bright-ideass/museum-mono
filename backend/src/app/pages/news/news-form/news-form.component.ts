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
import { LangPipePipe } from '@shared/pipes/lang-pipe.pipe';
import { NewsService } from '../news.service';
import { UnitPipePipe } from '@shared/pipes/unit-pipe.pipe';
import { NewsTypePipePipe } from '@shared/pipes/news-type-pipe.pipe';

@Component({
  selector: 'app-news-form',
  standalone: true,
  imports: [ValidatorErrorComponent,
    StateButtonComponent,
    FileOneUploadComponent,
    LangPipePipe,
    UnitPipePipe,
    NewsTypePipePipe,
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
    CommonModule],
  templateUrl: './news-form.component.html',
  styleUrl: './news-form.component.scss'
})
export class NewsFormComponent {
  UnitType = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  newsType = ['1', '2', '3', '12', '13', '14', '15'];
  selectNewsType = '訊息公告';
  id: number | undefined;
  action: string;
  dialogTitle: string;
  isForm: UntypedFormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public newsService: NewsService,
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
      if (data.lang === 'zh-tw') {
        this.selectNewsType = '訊息公告'
      }
    }
  }

  onFile(event: string, fileType: string) {
    this.isForm.get(fileType)?.setValue(event);
    this.isForm.get(fileType)?.markAsDirty();
    this.isForm.get(fileType)?.markAsTouched();
  }

  createForm(): UntypedFormGroup {
    return this.fb.group({
      Id: [''],
      publishStartDate: [new Date(), Validators.required],
      publishEndDate: [null],
      NewsType: [''],
      title: ['', [Validators.required, Validators.minLength(2)]],
      UnitId: [2, [Validators.required]],
      Color: ['', [Validators.required]],
      fileName: [null],
      fileUrl: [null],
      url: [''],
      introduction: [''],
      content: [null],
      lang: [''],
      state: [true]
    });
  }

  loadData(id: number) {
    this.newsService.findOne(id).subscribe(res => {
      this.isForm.patchValue(res);
      if (res.Color === '1' || res.Color === '12' || res.Color === '13') {
        this.selectNewsType = '訊息公告'
      } else {
        this.selectNewsType = '推廣專區'
      }
    });
  }

  confirmAdd() {
    this.newsService.save(this.isForm.value).subscribe(res => {
      this.dialogRef.close(res);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
