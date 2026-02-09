import { Component, ViewChild, OnInit, signal, Input } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { formatDate, NgClass, DatePipe } from '@angular/common';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { DeleteConfirmComponent } from '@shared/components/delete-confirm/delete-confirm.component';
import { TableLoadingComponent } from '@shared/components/loading/table-loading/table-loading.component';
import { TableElement, TableExportUtil } from '@shared';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { ExhibitDto } from '@core/entity/exhibit.entity';
import { ExhibitService } from '../exhibit.service';
import { ExhibitFormComponent } from '../exhibit-form/exhibit-form.component';
import { ExhibitVirtualFormComponent } from '../exhibit-virtual-form/exhibit-virtual-form.component';
import { ExhibitDigitalFormComponent } from '../exhibit-digital-form/exhibit-digital-form.component';
import { ExhibitImgFormComponent } from '../exhibit-img-form/exhibit-img-form.component';
import { ConfigService } from '@config';

@Component({
  selector: 'app-exhibit-list',
  standalone: true,
  imports: [
    TableLoadingComponent,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    NgClass,
    FeatherIconsComponent,
    MatRippleModule,
    MatPaginatorModule,
    DatePipe,
    BreadcrumbComponent
  ],
  templateUrl: './exhibit-list.component.html',
  styleUrl: './exhibit-list.component.scss'
})
export class ExhibitListComponent {

  front = this.configService.configuration()?.FRONT;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o: any, i: string) => o[i], obj);
  }
  displayedColumns: string[] = ['InputNo', 'ExhibitsName', 'ShowStarttime', 'CreatedTime', 'IsPublish', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<ExhibitDto[]>();

  $isLoading = signal(true);

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private exhibitServer: ExhibitService,
    private configService: ConfigService,
  ) { }


  ngOnInit(): void {
    this.loadTable();
  }

  loadTable() {
    this.exhibitServer.findAll().subscribe(res => {
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

  addNew() {
    const dialogRef = this.dialog.open(ExhibitFormComponent, {
      width: '1024px',
      data: {
        action: 'add',
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loadTable();
      }
    });
  }

  editCall(row: any) {
    const dialogRef = this.dialog.open(ExhibitFormComponent, {
      width: '1024px',
      data: {
        id: row.ExhibitsId,
        action: 'edit',
      },
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.toastr.success(`修改資料成功!`, 'success');
        this.loadTable();
      }
    });
  }

  editCallVirtual(row: any) {
    const dialogRef = this.dialog.open(ExhibitVirtualFormComponent, {
      data: {
        id: row.ExhibitsId,
        action: 'edit',
      },
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.toastr.success(`修改資料成功!`, 'success');
        this.loadTable();
      }
    });
  }

  editCallDigital(row: any) {
    const dialogRef = this.dialog.open(ExhibitDigitalFormComponent, {
      width: '800px',
      data: {
        id: row.ExhibitsId,
        action: 'edit',
      },
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.toastr.success(`修改資料成功!`, 'success');
        this.loadTable();
      }
    });
  }

  editCallImgs(row: any) {
    const dialogRef = this.dialog.open(ExhibitImgFormComponent, {
      width: '600px',
      data: {
        ExhibitsId: row.ExhibitsId,
        ExhibitsName: row.ExhibitsName,
        action: 'edit',
      },
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        // this.toastr.success(`修改資料成功!`, 'success');
        // this.loadTable();
      }
    });
  }

  refresh() { this.loadTable(); }

  async deleteItem(row: any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      data: {
        title: row.ExhibitsName,

      },
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.exhibitServer.remove(row).subscribe(res => {
          this.toastr.info(`${row.ExhibitsName}`, '資料已刪除成功!');
          this.refresh();
        });
      }
    });
  }

  exportExcel() {
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        '登錄號': x.InputNo,
        '展品名稱': x.ExhibitsName,
        '建立時間': x.CreatedTime,
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }

}
