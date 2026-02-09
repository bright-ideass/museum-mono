import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LawListComponent } from '../law-list/law-list.component';

@Component({
  selector: 'app-law-tab',
  standalone: true,
  imports: [BreadcrumbComponent, MatTabsModule, LawListComponent],
  templateUrl: './law-tab.component.html',
  styleUrl: './law-tab.component.scss'
})
export class LawTabComponent {

}
