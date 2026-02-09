import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitFormComponent } from './exhibit-form.component';

describe('ExhibitFormComponent', () => {
  let component: ExhibitFormComponent;
  let fixture: ComponentFixture<ExhibitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExhibitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
