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
import { LangPipePipe } from '@shared/pipes/lang-pipe.pipe';
import { LawService } from '../law.service';
import { CkEditorComponent } from '@shared/components/ck-editor/ck-editor.component';


@Component({
  selector: 'app-law-form',
  standalone: true,
  imports: [
    ValidatorErrorComponent,
    StateButtonComponent,
    CkEditorComponent,
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
  templateUrl: './law-form.component.html',
  styleUrl: './law-form.component.scss'
})
export class LawFormComponent {

  id: number | undefined;
  action: string;
  dialogTitle: string;
  isForm: UntypedFormGroup;
  ckEditData: string | undefined = '';

  constructor(
    public dialogRef: MatDialogRef<LawFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public lawService: LawService,
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
    }
  }


  createForm(): UntypedFormGroup {
    return this.fb.group({
      ID: [null],
      LawName: ['', [Validators.required, Validators.minLength(3)]],
      LawHis: [null],
      language: [null],
      orderby: [1],
      Detail: this.fb.group({
        LawSubID: [null],
        ID: [null],
        LawNo: [this.id],
        Content: [null],
      }),
      state: [true]
    });
  }

  onCkeditor(event: string) {
      this.isForm.value.Detail.Content = event;
      this.isForm.get('Detail')?.markAsDirty();
  }


  loadData(id: number) {
    this.lawService.findOne(id).subscribe(res => {
      this.isForm.patchValue(res);
      this.ckEditData = res.Detail?.Content;
    });
  }

  confirmAdd() {
    this.lawService.save(this.isForm.value).subscribe(res => {
      this.dialogRef.close(res);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
