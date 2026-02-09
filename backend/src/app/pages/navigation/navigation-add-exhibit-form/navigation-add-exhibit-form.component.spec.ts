import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationAddExhibitFormComponent } from './navigation-add-exhibit-form.component';

describe('NavigationAddExhibitFormComponent', () => {
  let component: NavigationAddExhibitFormComponent;
  let fixture: ComponentFixture<NavigationAddExhibitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationAddExhibitFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigationAddExhibitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
