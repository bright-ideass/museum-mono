import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QaGameItemListComponent } from './qa-game-item-list.component';

describe('QaGameItemListComponent', () => {
  let component: QaGameItemListComponent;
  let fixture: ComponentFixture<QaGameItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QaGameItemListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QaGameItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
