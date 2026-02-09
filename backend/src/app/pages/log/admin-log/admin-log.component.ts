import { Component, ViewChild, OnInit, signal, Input } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NgClass, DatePipe } from '@angular/common';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { MatTableModule } from '@angular/material/table'
import { TableLoadingComponent } from '@shared/components/loading/table-loading/table-loading.component';;
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { cbc_LogDTO } from '@core/entity/admin.entity';
import { CbcLogService } from '@core/service/cbc-log.service';
import { TableElement, TableExportUtil } from '@shared';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-admin-log',
  standalone: true,
  imports: [
    TableLoadingComponent,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    NgClass,
    FeatherIconsComponent,
    MatRippleModule,
    MatPaginatorModule,
    DatePipe,
    BreadcrumbComponent],
  templateUrl: './admin-log.component.html',
  styleUrl: './admin-log.component.scss'
})
export class AdminLogComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o: any, i: string) => o[i], obj);
  }
  displayedColumns: string[] = ['createDate', 'SubType', 'Memo', 'Where', 'What', 'ip',];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<cbc_LogDTO[]>();

  $isLoading = signal(true);
  constructor(
    private cbcLogService: CbcLogService,
  ) { }


  ngOnInit(): void {
    this.loadTable();
  }
  loadTable() {
    this.cbcLogService.getLogs().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (data, sortHeaderId: string) => {
        return this.getPropertyByPath(data, sortHeaderId);
      };
      this.$isLoading.set(false);
    });
  }

  applyFilter(event: Event) {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refresh() { this.loadTable(); }

  exportExcel() {
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        'createDate': x.createDate,
        'SubType': x.SubType,
        'Memo': x.Memo,
        'Where': x.Where,
        'What': x.What,
        'ip': x.ip,
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }

}
