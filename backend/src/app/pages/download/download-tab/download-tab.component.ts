import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DownloadListComponent } from '../download-list/download-list.component';
import { MediaTypePipe } from '@shared/pipes/media-type.pipe';

@Component({
  selector: 'app-download-tab',
  standalone: true,
  imports: [BreadcrumbComponent, MatTabsModule, DownloadListComponent, MediaTypePipe],
  templateUrl: './download-tab.component.html',
  styleUrl: './download-tab.component.scss'
})
export class DownloadTabComponent {

}
