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
import { NavigationDto } from '@core/entity/navigation.entity';
import { NavigationService } from '../navigation.service';
import { NavigationFormComponent } from '../navigation-form/navigation-form.component';
import { NavigationAddExhibitFormComponent } from '../navigation-add-exhibit-form/navigation-add-exhibit-form.component';
import { environment } from 'environments/environment';
import { DateCheckPipe } from '@shared/pipes/date-check.pipe';
import { ConfigService } from '@config';
@Component({
  selector: 'app-navigation-list',
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
    DateCheckPipe,
    BreadcrumbComponent
  ],
  templateUrl: './navigation-list.component.html',
  styleUrl: './navigation-list.component.scss'
})
export class NavigationListComponent {

  front = this.configService.configuration()?.FRONT;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o: any, i: string) => o[i], obj);
  }
  displayedColumns: string[] = ['Navigation', 'showDate1', 'NavigationType', 'CreatedTime', 'state', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<NavigationDto[]>();

  $isLoading = signal(true);

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private navigationServer: NavigationService,
    private configService: ConfigService,
  ) { }


  ngOnInit(): void {
    this.loadTable();
  }

  loadTable() {
    this.navigationServer.findAll().subscribe(res => {
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
    const dialogRef = this.dialog.open(NavigationFormComponent, {
      width: '960px',
      data: {
        action: 'add',
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.toastr.success(`修改資料成功!`, 'success');
        this.loadTable();
      }
    });
  }

  editCall(row: any) {
    const dialogRef = this.dialog.open(NavigationFormComponent, {
      width: '960px',
      data: {
        id: row.NavigationId,
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

  editExhAdd(row: any) {
    const dialogRef = this.dialog.open(NavigationAddExhibitFormComponent, {
      // width: '960px',
      data: {
        navigation: row.Navigation,
        navigationId: row.NavigationId,
        room1_Name: row.room1_Name,
        room2_Name: row.room2_Name,
        room3_Name: row.room3_Name,
        action: 'edit',
      },
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.toastr.success(`修改資料成功!`, 'success');
      }
    });
  }


  refresh() { this.loadTable(); }
  async deleteItem(row: any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      data: {
        title: row.Navigation,

      },
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.navigationServer.remove(row).subscribe(res => {
          this.toastr.info(`${row.Navigation}`, '資料已刪除成功!');
          this.refresh();
        });
      }
    });
  }

  exportExcel() {
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        '展覽名稱': x.Navigation,
        '展覽日期': x.showDate1 + ' ~ ' + x.showDate2,
        '建立時間': x.CreatedTime,
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }

}
