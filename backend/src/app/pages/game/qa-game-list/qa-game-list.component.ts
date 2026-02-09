import { Component, ViewChild, OnInit, signal, Input } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NgClass, DatePipe } from '@angular/common';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { DeleteConfirmComponent } from '@shared/components/delete-confirm/delete-confirm.component';
import { TableLoadingComponent } from '@shared/components/loading/table-loading/table-loading.component';
import { TableElement, TableExportUtil } from '@shared';
import { QaGameDto } from '@core/entity/game.entity';
import { QaGameService } from '../qa-game.service';
import { QaGameFormComponent } from '../qa-game-form/qa-game-form.component';
import { ConfigService } from '@config';

@Component({
  selector: 'app-qa-game-list',
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
  ],
  templateUrl: './qa-game-list.component.html',
  styleUrl: './qa-game-list.component.scss'
})
export class QaGameListComponent {

  front = this.configService.configuration()?.FRONT;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o: any, i: string) => o[i], obj);
  }
  displayedColumns: string[] = ['Title', 'CreatedTime', 'state', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<QaGameDto[]>();

  $isLoading = signal(true);

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private qaGameService: QaGameService,
    private configService: ConfigService,
  ) { }


  ngOnInit(): void {
    this.loadTable();
  }

  loadTable() {
    this.qaGameService.findAllQa().subscribe(res => {
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
    const dialogRef = this.dialog.open(QaGameFormComponent, {
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
    const dialogRef = this.dialog.open(QaGameFormComponent, {
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
        title: row.Title,

      },
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.qaGameService.removeQa(row).subscribe(res => {
          this.toastr.info(`${row.Title}`, '資料已刪除成功!');
          this.refresh();
        });
      }
    });
  }


  exportExcel() {
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        '問題': x.question,
        '類別': x.faq_type,
        '語系': x.learning,
        '建立時間': x.CreatedTime,
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }

}
