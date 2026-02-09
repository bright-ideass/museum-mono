import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitDigitalFormComponent } from './exhibit-digital-form.component';

describe('ExhibitDigitalFormComponent', () => {
  let component: ExhibitDigitalFormComponent;
  let fixture: ComponentFixture<ExhibitDigitalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitDigitalFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExhibitDigitalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
