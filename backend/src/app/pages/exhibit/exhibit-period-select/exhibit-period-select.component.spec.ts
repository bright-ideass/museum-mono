import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitPeriodSelectComponent } from './exhibit-period-select.component';

describe('ExhibitPeriodSelectComponent', () => {
  let component: ExhibitPeriodSelectComponent;
  let fixture: ComponentFixture<ExhibitPeriodSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitPeriodSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExhibitPeriodSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
