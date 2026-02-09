import { Component, ViewChild, OnInit, signal, Input } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Confirmable } from '@core/decorator/confirmable.decorator';
import { formatDate, NgClass, DatePipe } from '@angular/common';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { DeleteConfirmComponent } from '@shared/components/delete-confirm/delete-confirm.component';
import { TableLoadingComponent } from '@shared/components/loading/table-loading/table-loading.component';
import Swal from 'sweetalert2';
import { DownloadDto } from '@core/entity/download.entity';
import { DownloadService } from '../download.service';
import { DownloadFormComponent } from '../download-form/download-form.component';
import { TableElement, TableExportUtil } from '@shared';
import { environment } from 'environments/environment';
import { MediaTypePipe } from '@shared/pipes/media-type.pipe';
import { ConfigService } from '@config';
@Component({
  selector: 'app-download-list',
  standalone: true,
  imports: [
    MediaTypePipe,
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
    DatePipe,],
  templateUrl: './download-list.component.html',
  styleUrl: './download-list.component.scss'
})
export class DownloadListComponent implements OnInit {

  @Input() mediaType: string | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o: any, i: string) => o[i], obj);
  }
  displayedColumns: string[] = ['image', 'Title', 'startDate', 'endDate', 'CreatedTime', 'state', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<DownloadDto[]>();
  ExhibitsImg = this.configService.configuration()?.EXHIBITS_IMG + 'web/';;
  $isLoading = signal(true);
  front = this.configService.configuration()?.FRONT;

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private downloadService: DownloadService,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable() {
    this.downloadService.findAll(this.mediaType).subscribe(res => {
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
    const dialogRef = this.dialog.open(DownloadFormComponent, {
      data: {
        action: 'add',
        mediaType: this.mediaType
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loadTable();
      }
    });
  }

  editCall(row: any) {
    const dialogRef = this.dialog.open(DownloadFormComponent, {
      data: {
        id: row.ID,
        action: 'edit',
        mediaType: this.mediaType
      },
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.toastr.success(`修改資料成功!`, 'success');
        this.loadTable();
      }
    });
  }

  refresh() { this.loadTable(); }

  async deleteItem(row: any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      data: {
        title: row.Title,
      },
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.downloadService.remove(row).subscribe(res => {
          this.toastr.info(`${row.Title}`, '資料已刪除成功!');
          this.refresh();
        });
      }
    });
  }

  showImage(path: string | null) {
    Swal.fire({
      imageUrl: path,
      imageAlt: 'image',
    })
  };

  exportExcel() {
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        '名稱': x.Title,
        '生效日期': x.startDate,
        '截止日期': x.endDate,
        '修改日期': x.CreatedTime,
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }
}
