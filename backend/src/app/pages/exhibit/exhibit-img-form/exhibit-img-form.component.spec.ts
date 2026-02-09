import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitImgFormComponent } from './exhibit-img-form.component';

describe('ExhibitImgFormComponent', () => {
  let component: ExhibitImgFormComponent;
  let fixture: ComponentFixture<ExhibitImgFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitImgFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExhibitImgFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
