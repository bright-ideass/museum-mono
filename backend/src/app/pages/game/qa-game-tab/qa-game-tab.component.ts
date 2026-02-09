import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatTabsModule } from '@angular/material/tabs';
import { QaGameListComponent } from '../qa-game-list/qa-game-list.component';
import { QaGameItemListComponent } from '../qa-game-item-list/qa-game-item-list.component';

@Component({
  selector: 'app-qa-game-tab',
  standalone: true,
  imports: [BreadcrumbComponent, MatTabsModule, QaGameListComponent, QaGameItemListComponent],
  templateUrl: './qa-game-tab.component.html',
  styleUrl: './qa-game-tab.component.scss'
})
export class QaGameTabComponent {

}
