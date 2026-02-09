import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ExhibitPeriodTypeDto } from '@core/entity/exhibit.entity';
import { ExhibitService } from '../exhibit.service';
import { ExhibitPeriodTypePipe } from '@shared/pipes/exhibit-use-type.pipe';


@Component({
  selector: 'app-exhibit-period-select',
  standalone: true,
  imports: [MatSelectModule, FormsModule, ExhibitPeriodTypePipe],
  templateUrl: './exhibit-period-select.component.html',
  styleUrl: './exhibit-period-select.component.scss'
})
export class ExhibitPeriodSelectComponent {

  @Input() type: string | undefined;
  @Input() parentSelect: number | null = null;
  @Input() isSelect: number | null = null;
  @Output() isCategory: EventEmitter<any> = new EventEmitter();
  isSelectId: number | undefined;
  isSelectData: ExhibitPeriodTypeDto[] = [];
  isLoading = signal(true);
  typeCheck = ['Period', 'DigitalTyp0', 'DigitalTyp1', 'DigitalTyp2']

  constructor(
    private exhibitService: ExhibitService
  ) { }



  ngOnChanges() {

    if (this.typeCheck.includes(this.type || ''))
      this.exhibitService.findPeriodType(this.type || '').subscribe(res => {
        this.isSelectData = res;
        this.isLoading.set(false);
      });

    if (this.type === 'subCode')
      this.exhibitService.findPeriodSubType(this.parentSelect).subscribe(res => {
        this.isSelectData = res;
        this.isLoading.set(false);
      });

  }

  someMethod(event: any) {
    console.log('event:', event.value)
    this.isCategory.emit(event.value);
  }

}
