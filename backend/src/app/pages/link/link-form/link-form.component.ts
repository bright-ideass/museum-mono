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
import { LinkService } from '../link.service';


@Component({
  selector: 'app-link-form',
  standalone: true,
  imports: [
    ValidatorErrorComponent,
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
    CommonModule
  ],
  templateUrl: './link-form.component.html',
  styleUrl: './link-form.component.scss'
})
export class LinkFormComponent {

  areaType = signal(['臺灣', '歐洲', '亞洲', '大洋洲', '美洲', '非洲']);
  action: string;
  dialogTitle: string;
  isForm: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<LinkFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public linkService: LinkService,
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

  createForm(): UntypedFormGroup {
    return this.fb.group({
      Id: [null],
      Title: [null, [Validators.required, Validators.minLength(2)]],
      Area: [null, [Validators.required]],
      language: [null, [Validators.required]],
      startDate: [null],
      endDate: [null],
      Url: [null],
      state: [true, [Validators.required]]
    });
  }

  loadData(id: number) {
    this.linkService.findOne(id).subscribe(res => {
      this.isForm.patchValue(res);

    });
  }

  confirmAdd() {
    this.linkService.save(this.isForm.value).subscribe(res => {
      this.dialogRef.close(res);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



}