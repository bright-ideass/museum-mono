import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exhibitType',
  standalone: true
})
export class ExhibitTypePipe implements PipeTransform {

  transform(value: unknown): unknown {
    switch (value) {
      case 1:
        return '鈔券';
      case 2:
        return '硬幣';
    }
    return null;
  }
}


@Pipe({
  name: 'exhibitUseType',
  standalone: true
})
export class ExhibitUseTypePipe implements PipeTransform {

  transform(value: unknown): unknown {
    switch (value) {
      case 1:
        return '流通性';
      case 2:
        return '紀念性';
      case 3:
        return '流通紀念性';
    }
    return null;
  }

}


@Pipe({
  name: 'exhibitDocType',
  standalone: true
})
export class ExhibitDocTypePipe implements PipeTransform {

  transform(value: unknown): unknown {
    switch (value) {
      case '1':
        return '已廢止券幣';
      case '2':
        return '停止流通券幣';
      case '3':
        return '流通鈔券';
      case '4':
        return '紀念流通鈔券';
      case '5':
        return '紀念鈔券';
      case '6':
        return '流通硬幣';
      case '7':
        return '紀念流通硬幣';
      case '8':
        return '紀念章';
      case '9':
        return '紀念幣';
      case '10':
        return '紀念套幣';
      case '11':
        return '其它';
    }
    return null;
  }

}

@Pipe({
  name: 'exhibitPeriodType',
  standalone: true
})
export class ExhibitPeriodTypePipe implements PipeTransform {

  transform(value: unknown): unknown {
    switch (value) {
      case 'code':
        return '時期';
      case 'subCode':
        return '類別';
    }
    return null;
  }
}
