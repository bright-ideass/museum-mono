import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FaqListComponent } from '../faq-list/faq-list.component';


@Component({
  selector: 'app-faq-tab',
  standalone: true,
  imports: [BreadcrumbComponent, MatTabsModule, FaqListComponent],
  templateUrl: './faq-tab.component.html',
  styleUrl: './faq-tab.component.scss'
})
export class FaqTabComponent {

}
