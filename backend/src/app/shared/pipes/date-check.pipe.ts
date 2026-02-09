import { Pipe, PipeTransform } from '@angular/core';
import { addDays, format, subDays } from 'date-fns';
@Pipe({
  name: 'dateCheck',
  standalone: true
})
export class DateCheckPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): unknown {

    const date = new Date(value)
    const toDate = new Date();
    if (args.includes('end')) {
      switch (true) {
        case (date < toDate):
          return '已下架'
      }
    }
    if (args.includes('start')) {
      switch (true) {
        case (date > toDate):
          return '未上架'
      }
    }

    return null;
  }

}
