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
import { TableElement, TableExportUtil } from '@shared';
import { LangPipePipe } from '@shared/pipes/lang-pipe.pipe';
import { NewsDto } from '@core/entity/news.entity';
import { NewsService } from './news.service';
import { NewsFormComponent } from './news-form/news-form.component';
import { UnitPipePipe } from '@shared/pipes/unit-pipe.pipe';
import { NewsTypePipePipe } from '@shared/pipes/news-type-pipe.pipe';
import { environment } from 'environments/environment';
import { DateCheckPipe } from '@shared/pipes/date-check.pipe';
import { ConfigService } from '@config';
@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    TableLoadingComponent,
    LangPipePipe,
    UnitPipePipe,
    DateCheckPipe,
    NewsTypePipePipe,
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
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit {


  front = this.configService.configuration()?.FRONT;

  @Input() lang: string | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o: any, i: string) => o[i], obj);
  }
  displayedColumns: string[] = ['title', 'Unit', 'Color', 'publishStartDate', 'CreatedTime', 'lang', 'Publish', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<NewsDto[]>();

  $isLoading = signal(true);

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private newsService: NewsService,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.loadTable();
  }
  loadTable() {
    this.newsService.findAll(this.lang).subscribe(res => {
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

    const dialogRef = this.dialog.open(NewsFormComponent, {
      data: {
        lang: this.lang,
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
    const dialogRef = this.dialog.open(NewsFormComponent, {
      data: {
        id: row.Id,
        action: 'edit',
      },
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        console.log('edit')
        this.toastr.success(`修改資料成功!`, 'success');
        this.loadTable();
      }
    });
  }

  refresh() { this.loadTable(); }

  async deleteItem(row: any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      data: {
        title: row.title,
      },
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.newsService.remove(row).subscribe(res => {
          this.toastr.info(`${row.title}`, '資料已刪除成功!');
          this.refresh();
        });
      }
    });
  }

  exportExcel() {
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        '標題': x.title,
        '語系': x.lang,
        '建立時間': x.CreatedTime,
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }

}
