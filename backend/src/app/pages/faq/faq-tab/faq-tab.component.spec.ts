import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqTabComponent } from './faq-tab.component';

describe('FaqTabComponent', () => {
  let component: FaqTabComponent;
  let fixture: ComponentFixture<FaqTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FaqTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
