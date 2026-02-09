import { Component, ViewChild } from '@angular/core';
import { ApexTitleSubtitle, ApexMarkers, ChartComponent, ApexAxisChartSeries, ApexNonAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexTooltip, ApexYAxis, ApexPlotOptions, ApexStroke, ApexLegend, ApexFill, ApexResponsive, NgApexchartsModule } from 'ng-apexcharts';
import { NgxGaugeType } from 'ngx-gauge/gauge/gauge';
import { dataSeries } from './chartdata';
import { MatButtonModule } from '@angular/material/button';
import { NgScrollbar } from 'ngx-scrollbar';
import { NgxGaugeModule } from 'ngx-gauge';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '@core';
import { AdminDTO } from '@core/entity/admin.entity';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [
    NgApexchartsModule,
    MatTooltipModule,
    MatTabsModule,
    MatIconModule,
    NgxGaugeModule,
    NgScrollbar,
    MatButtonModule,
  ],
})
export class MainComponent {
  isAdmin?: AdminDTO;
  constructor(
    private authService: AuthService,
  ) {
    this.isAdmin = this.authService.currentAdminValue;
  }

}
