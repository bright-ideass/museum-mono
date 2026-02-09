import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawFormComponent } from './law-form.component';

describe('LawFormComponent', () => {
  let component: LawFormComponent;
  let fixture: ComponentFixture<LawFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LawFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
