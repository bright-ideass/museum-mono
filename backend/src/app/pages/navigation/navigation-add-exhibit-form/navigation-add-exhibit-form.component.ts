import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropListGroup, CdkDropList, CdkDragPlaceholder, CdkDragHandle } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { Confirmable } from '@core/decorator/confirmable.decorator';

import { NavigationService } from '../navigation.service';
import { NavigationExhibitsDto } from '@core/entity/navigation.entity';
import { ExhibitPreviewComponent } from 'app/pages/exhibit/exhibit-preview/exhibit-preview.component';


@Component({
  selector: 'app-navigation-add-exhibit-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogContent,
    MatDialogClose,
    CommonModule,
    CdkDrag,
    CdkDropListGroup,
    CdkDropList,
    CdkDragPlaceholder,
    CdkDragHandle,
  ],
  templateUrl: './navigation-add-exhibit-form.component.html',
  styleUrl: './navigation-add-exhibit-form.component.scss'
})
export class NavigationAddExhibitFormComponent {

  action: string;
  dialogTitle: string;
  navigationId: number | undefined;
  room1_Name: string | undefined;
  room2_Name: string | undefined;
  room3_Name: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<NavigationAddExhibitFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public navigationService: NavigationService,
    private dialog: MatDialog,
  ) {
    this.action = data.action;
    this.dialogTitle = data.navigation
    this.room1_Name = data.room1_Name
    this.room2_Name = data.room2_Name
    this.room3_Name = data.room3_Name
    this.navigationId = data.navigationId;
    this.loadData(data.navigationId);
  }
  exhibitList = signal<NavigationExhibitsDto[]>([]);
  room1: NavigationExhibitsDto[] = [];
  room2: NavigationExhibitsDto[] = [];
  room3: NavigationExhibitsDto[] = [];
  exhibitListKeyword = signal<NavigationExhibitsDto[]>([]);


  drop(event: CdkDragDrop<NavigationExhibitsDto[]>) {
    console.log('event.previousContainer:', event)
    console.log('event.container.data:', event.container.data)

    if (event.previousContainer === event.container) {
      console.log('moveItemInArray-------------------------------->')
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log('transferArrayItem-------------------------------->')
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

    }
    event.container?.data?.forEach((item, index) => {
      item.Sort = index + 1;
    })
    event.previousContainer?.data?.forEach((item, index) => {
      item.Sort = index + 1;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const data = this.exhibitListKeyword().filter(item => !this.room1.some(roomItem => roomItem.ExhibitsId === item.ExhibitsId))
      .filter(item => !this.room2.some(roomItem => roomItem.ExhibitsId === item.ExhibitsId))
      .filter(item => !this.room3.some(roomItem => roomItem.ExhibitsId === item.ExhibitsId))
    this.exhibitList.set(data.filter(item => {
      // console.log(item.ExhibitsName)
      return item.ExhibitsName.includes(filterValue.trim().toLowerCase());
    }))
    // console.log(this.room3)

  }

  loadData(id: number) {
    this.navigationService.exhibitList(id).subscribe(res => {
      this.exhibitListKeyword.set(res.Exhibits);
      this.exhibitList.set(res.Exhibits.filter(item => !res.room.some(roomItem => roomItem.ExhibitsId === item.ExhibitsId)));
      this.room1 = res.room.filter(item => item.RoodId === 1)
      this.room2 = res.room.filter(item => item.RoodId === 2)
      this.room3 = res.room.filter(item => item.RoodId === 3).sort((a, b) => { return a.Sort - b.Sort })
    });
  }


  @Confirmable({ html: '請確認是否變更要調整，並按SAVE儲存。' })
  confirm() {
    this.navigationService.exhibitListSave(this.navigationId, { room1: this.room1, room2: this.room2, room3: this.room3 }).subscribe(res => {
      this.dialogRef.close(res);
    })
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  editExhPreview(id: number) {
    const dialogRef = this.dialog.open(ExhibitPreviewComponent, {
      // width: '960px',
      data: {
        ExhibitsId: id
      },
    });
    dialogRef.afterClosed().subscribe(res => {

    });
  }

}
