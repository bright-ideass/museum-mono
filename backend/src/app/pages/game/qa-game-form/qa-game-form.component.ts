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
import { QaGameService } from '../qa-game.service';
import { FileOneUploadComponent } from '@shared/components/upload/file-one-upload/file-one-upload.component';

@Component({
  selector: 'app-qa-game-form',
  standalone: true,
  imports: [
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
  templateUrl: './qa-game-form.component.html',
  styleUrl: './qa-game-form.component.scss'
})
export class QaGameFormComponent {

  action: string;
  dialogTitle: string;
  isForm: UntypedFormGroup;

  constructor(
    public dialogRef: MatDialogRef<QaGameFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public qaGameService: QaGameService,
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
      Title: [null, [Validators.required, Validators.minLength(2)]],
      File1: [null],
      File2: [null],
      language: [null],
      orderby: [null],
      state: [true, [Validators.required]]
    });
  }

  loadData(id: number) {
    this.qaGameService.findOneQa(id).subscribe(res => {
      this.isForm.patchValue(res);

    });
  }
  confirmAdd() {
    this.qaGameService.saveQa(this.isForm.value).subscribe(res => {
      this.dialogRef.close(res);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
