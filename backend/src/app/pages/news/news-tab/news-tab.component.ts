import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NewsComponent } from '../news.component';
@Component({
  selector: 'app-news-tab',
  standalone: true,
  imports: [BreadcrumbComponent, MatTabsModule, NewsComponent],
  templateUrl: './news-tab.component.html',
  styleUrl: './news-tab.component.scss'
})
export class NewsTabComponent {

}
