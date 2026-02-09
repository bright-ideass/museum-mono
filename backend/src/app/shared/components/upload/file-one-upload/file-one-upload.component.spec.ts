import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileOneUploadComponent } from './file-one-upload.component';

describe('FileOneUploadComponent', () => {
  let component: FileOneUploadComponent;
  let fixture: ComponentFixture<FileOneUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileOneUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileOneUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
