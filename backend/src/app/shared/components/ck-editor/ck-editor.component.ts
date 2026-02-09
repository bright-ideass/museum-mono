import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shared-ck-editor',
  standalone: true,
  imports: [CKEditorModule, FormsModule],
  templateUrl: './ck-editor.component.html',
  styleUrl: './ck-editor.component.scss'
})
export class CkEditorComponent {
  @Input() htmlData: string | undefined = '';
  @Output() isHtmlData: EventEmitter<any> = new EventEmitter();
  public edit = { editorData: null };

  public Editor: any = ClassicEditor;

  constructor() { }

  onReady(eventData: any) {
    eventData.plugins.get('FileRepository').createUploadAdapter = function (loader: any) {
      console.log('loader : ', loader);
      console.log(btoa(loader.file));
      return new UploadAdapter(loader);
    };
  }

  public onChange({ editor }: ChangeEvent) {
    this.isHtmlData.emit(editor?.data?.get());
  }

}


export class UploadAdapter {
  private loader: any | null;
  constructor(loader: any) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file
      .then((file: Blob) => new Promise((resolve, reject) => {
        const myReader = new FileReader();
        myReader.onloadend = (e) => {
          resolve({ default: myReader.result });
        };

        myReader.readAsDataURL(file);
      }));
  }
}
