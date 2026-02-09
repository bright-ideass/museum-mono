import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QaGameTabComponent } from './qa-game-tab.component';

describe('QaGameTabComponent', () => {
  let component: QaGameTabComponent;
  let fixture: ComponentFixture<QaGameTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QaGameTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QaGameTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
