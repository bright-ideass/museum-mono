import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExhibitService } from './../exhibit.service';
import { ExhibitPreviewDto } from '@core/entity/exhibit.entity';
import { MatCardModule } from '@angular/material/card';
import { ConfigService } from '@config';

@Component({
  selector: 'app-exhibit-preview',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogContent,
    MatDialogClose,
    MatCardModule,
  ],
  templateUrl: './exhibit-preview.component.html',
  styleUrl: './exhibit-preview.component.scss'
})
export class ExhibitPreviewComponent {

  dialogTitle: string;
  exhibits = signal<ExhibitPreviewDto | null>(null)
  ExhibitsEnlarge = this.configService.configuration()?.EXHIBITS_IMG + 'Enlarge/';

  constructor(
    public dialogRef: MatDialogRef<ExhibitPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public exhibitService: ExhibitService,
    private configService: ConfigService,
  ) {
    this.dialogTitle = data.ExhibitsName
    this.loadData(data.ExhibitsId);
  }


  loadData(id: number) {
    this.exhibitService.findPreview(id).subscribe(res => {
      this.exhibits.set(res)
      this.dialogTitle = res.ExhibitsName
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
