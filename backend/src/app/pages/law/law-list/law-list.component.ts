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
import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag, CdkDragHandle, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { LawDto } from '@core/entity/law.entity';
import { LawService } from '../law.service';
import { LawFormComponent } from '../law-form/law-form.component';
import { environment } from 'environments/environment';
import { ConfigService } from '@config';
@Component({
  selector: 'app-law-list',
  standalone: true,
  imports: [TableLoadingComponent,
    LangPipePipe,
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
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    CdkDragPlaceholder,],
  templateUrl: './law-list.component.html',
  styleUrl: './law-list.component.scss'
})
export class LawListComponent implements OnInit {
  front = this.configService.configuration()?.FRONT;

  @Input() lang: string | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o: any, i: string) => o[i], obj);
  }
  displayedColumns: string[] = ['drag', 'orderby', 'LawName', 'language', 'state', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<LawDto[]>();

  $isLoading = signal(true);

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private lawService: LawService,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable() {
    this.lawService.findAll(this.lang).subscribe(res => {
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
    const dialogRef = this.dialog.open(LawFormComponent, {
      data: {
        action: 'add',
        lang: this.lang
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loadTable();
      }
    });
  }

  editCall(row: any) {
    const dialogRef = this.dialog.open(LawFormComponent, {
      data: {
        id: row.ID,
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
        title: row.LawName,
      },
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.lawService.remove(row).subscribe(res => {
          this.toastr.info(`${row.LawName}`, '資料已刪除成功!');
          this.refresh();
        });
      }
    });
  }


  exportExcel() {
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        '標題': x.LawName,
        '語系': x.language,
        '建立時間': x.CreatedTime,
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }

  @Confirmable({ html: '請確認是否變更排序!' })
  dropTable(event: CdkDragDrop<any>) {
    if (event) {
      const prevIndex = this.dataSource.data.findIndex((d) => d === event?.item.data);
      moveItemInArray(this.dataSource.data, prevIndex, event.currentIndex);
      this.dataSource.data.forEach((s, index) => {
        console.log(s.imgName, s.sortId, index + 1)
        s.orderby = index + 1;
      });

      this.lawService.sort(this.dataSource.data).subscribe(res => {
        this.loadTable();
      });
    }
  }

}
