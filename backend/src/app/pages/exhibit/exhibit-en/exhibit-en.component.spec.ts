import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitEnComponent } from './exhibit-en.component';

describe('ExhibitEnComponent', () => {
  let component: ExhibitEnComponent;
  let fixture: ComponentFixture<ExhibitEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitEnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExhibitEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
