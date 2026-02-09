import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QaGameItemFormComponent } from './qa-game-item-form.component';

describe('QaGameItemFormComponent', () => {
  let component: QaGameItemFormComponent;
  let fixture: ComponentFixture<QaGameItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QaGameItemFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QaGameItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
