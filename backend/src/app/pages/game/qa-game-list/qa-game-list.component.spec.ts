import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QaGameListComponent } from './qa-game-list.component';

describe('QaGameListComponent', () => {
  let component: QaGameListComponent;
  let fixture: ComponentFixture<QaGameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QaGameListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QaGameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
