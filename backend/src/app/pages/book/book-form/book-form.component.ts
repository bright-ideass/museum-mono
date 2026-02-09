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
import { BookService } from '../book.service';
import { FileOneUploadComponent } from '@shared/components/upload/file-one-upload/file-one-upload.component';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ValidatorErrorComponent,
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
    CommonModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent {

  action: string;
  dialogTitle: string;
  isForm: UntypedFormGroup;

  constructor(
    public dialogRef: MatDialogRef<BookFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public bookService: BookService,
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

  onFile(event: string, type: string) {
    this.isForm.get(type)?.setValue(event);
    this.isForm.get(type)?.markAsDirty();
    this.isForm.get(type)?.markAsTouched();
  }

  createForm(): UntypedFormGroup {
    return this.fb.group({
      ID: [null],
      bookname: [null, [Validators.required, Validators.minLength(2)]],
      user1: [null, [Validators.required]],
      user2: [null],
      org: [null, [Validators.required]],
      publishdate: [null, [Validators.required]],
      language: [null, [Validators.required]],
      ISBN: [null],
      content: [null],
      File1: [null],
      File2: [null],
      orderby: [null],
      state: [true, [Validators.required]]
    });
  }

  loadData(id: number) {
    this.bookService.findOne(id).subscribe(res => {
      this.isForm.patchValue(res);

    });
  }

  confirmAdd() {
    this.bookService.save(this.isForm.value).subscribe(res => {
      this.dialogRef.close(res);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
