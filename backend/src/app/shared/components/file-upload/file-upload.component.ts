/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgScrollbar } from 'ngx-scrollbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true,
    },
  ],
  styleUrls: ['./file-upload.component.scss'],
  standalone: true,
  imports: [MatButtonModule, NgScrollbar, MatProgressBarModule],
})
export class FileUploadComponent implements ControlValueAccessor {
  onChange!: Function;
  public file: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    console.log('-------------')
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }

  constructor(private host: ElementRef<HTMLInputElement>) { }

  writeValue(value: null) {
    console.log('------------- clear file input')
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: Function) {
    console.log('------------- registerOnChange')
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
    console.log('------------- add code here')

    // add code here
  }
}
