import { Component } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-shared-table-loading',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './table-loading.component.html',
  styleUrl: './table-loading.component.scss'
})
export class TableLoadingComponent {

}
