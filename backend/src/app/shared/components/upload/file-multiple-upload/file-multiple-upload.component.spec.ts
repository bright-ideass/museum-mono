import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileMultipleUploadComponent } from './file-multiple-upload.component';

describe('FileMultipleUploadComponent', () => {
  let component: FileMultipleUploadComponent;
  let fixture: ComponentFixture<FileMultipleUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileMultipleUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileMultipleUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
