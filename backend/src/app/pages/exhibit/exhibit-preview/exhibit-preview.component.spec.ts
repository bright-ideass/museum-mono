import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitPreviewComponent } from './exhibit-preview.component';

describe('ExhibitPreviewComponent', () => {
  let component: ExhibitPreviewComponent;
  let fixture: ComponentFixture<ExhibitPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExhibitPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
