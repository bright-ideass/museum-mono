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
import { LangPipePipe } from '@shared/pipes/lang-pipe.pipe';
import { FaqService } from '../faq.service';
import { FaqDto, FaqTypeDto } from '@core/entity/faq.entity';
@Component({
  selector: 'app-faq-form',
  standalone: true,
  imports: [ValidatorErrorComponent,
    StateButtonComponent,
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
    CommonModule],
  templateUrl: './faq-form.component.html',
  styleUrl: './faq-form.component.scss'
})
export class FaqFormComponent {
  faqType = signal<FaqTypeDto[]>([]);
  action: string;
  dialogTitle: string;
  isForm: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<FaqFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public faqService: FaqService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.action;
    this.isForm = this.createForm();

    if (this.action === 'edit') {
      this.dialogTitle = 'edit';
      this.loadData(data.id);
    } else {
      this.dialogTitle = 'New Record';
      this.isForm.get('language')?.setValue(data.lang);
      this.loadType(data.lang);
    }

  }

  createForm(): UntypedFormGroup {
    return this.fb.group({
      id: [''],
      question: [null, [Validators.required, Validators.minLength(2)]],
      answer: [null, [Validators.required, Validators.minLength(2)]],
      faq_type: [null, [Validators.required]],
      language: [null],
      orderby: [null],
      state: [true, [Validators.required]]
    });
  }

  loadType(isLang: string) {
    if (isLang !== this.isForm.get('language')?.value) {
      this.isForm.get('faq_type')?.setValue(null)
    }
    this.faqService.findFaqType(isLang).subscribe(res => {
      return this.faqType.set(res);
    });
  }

  loadData(id: number) {
    this.faqService.findOne(id).subscribe(res => {
      this.isForm.patchValue(res);
      this.loadType(res.language);
    });
  }

  confirmAdd() {
    this.faqService.save(this.isForm.value).subscribe(res => {
      this.dialogRef.close(res);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
