import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitVirtualFormComponent } from './exhibit-virtual-form.component';

describe('ExhibitVirtualFormComponent', () => {
  let component: ExhibitVirtualFormComponent;
  let fixture: ComponentFixture<ExhibitVirtualFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitVirtualFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExhibitVirtualFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
