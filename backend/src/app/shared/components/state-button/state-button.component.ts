import { Component, Input, OnInit } from '@angular/core';
import { FormControl,  ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-shareds-state-button',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSlideToggleModule],
  templateUrl: './state-button.component.html',
  styleUrl: './state-button.component.scss'
})
export class StateButtonComponent {
  @Input() control!: any;


  constructor(

  ) {
  }



}
