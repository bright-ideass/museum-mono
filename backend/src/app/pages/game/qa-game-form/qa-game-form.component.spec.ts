import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QaGameFormComponent } from './qa-game-form.component';

describe('QaGameFormComponent', () => {
  let component: QaGameFormComponent;
  let fixture: ComponentFixture<QaGameFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QaGameFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QaGameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
