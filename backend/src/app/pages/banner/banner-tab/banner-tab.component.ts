import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BannerComponent } from '../banner.component';
@Component({
  selector: 'app-banner-tab',
  standalone: true,
  imports: [BreadcrumbComponent, MatTabsModule, BannerComponent],
  templateUrl: './banner-tab.component.html',
  styleUrl: './banner-tab.component.scss'
})
export class BannerTabComponent {

}
