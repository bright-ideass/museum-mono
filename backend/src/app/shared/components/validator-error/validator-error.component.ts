import { Component, OnInit, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
interface ErrorMessage {
  [key: string]: (arg: any) => string;
}

@Component({
  selector: 'app-shared-validator-error',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule
  ],
  template: `
    @if(shouldShowErrors()){ @for(error of listOfErrors(); track $index){
    {{error}}}    }`

})
export class ValidatorErrorComponent implements OnInit {

  @Input() ctrl!: any;

  ERROR_MESSAGE: ErrorMessage = {
    required: () => `必填資料，請記得輸入喔！`,
    minlength: (par) => `至少輸入 ${par.requiredLength} 個字吧！`,
    email: () => `EMAIL格式錯誤了!`,
    pattern: () => `輸入的資料格式錯誤了!`,
  };

  constructor() { }

  ngOnInit() { }

  shouldShowErrors() {
    return this.ctrl && this.ctrl.errors && this.ctrl.touched;
  }

  listOfErrors(): string[] {
    if (this.ctrl?.errors) {
      return Object.keys(this.ctrl.errors).map(
        err => this.ERROR_MESSAGE[err]?.(this.ctrl?.getError(err)) || '未知錯誤'
      );
    }
    return [];
  }

}
