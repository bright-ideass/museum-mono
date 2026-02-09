import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawListComponent } from './law-list.component';

describe('LawListComponent', () => {
  let component: LawListComponent;
  let fixture: ComponentFixture<LawListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LawListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
