import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerTabComponent } from './banner-tab.component';

describe('BannerTabComponent', () => {
  let component: BannerTabComponent;
  let fixture: ComponentFixture<BannerTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
