import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileInfoEditComponent } from './file-info-edit.component';

describe('FileInfoEditComponent', () => {
  let component: FileInfoEditComponent;
  let fixture: ComponentFixture<FileInfoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileInfoEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
