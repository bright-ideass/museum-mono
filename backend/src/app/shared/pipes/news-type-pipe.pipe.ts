import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newsTypePipe',
  standalone: true
})
export class NewsTypePipePipe implements PipeTransform {

  transform(value: unknown): unknown {
    switch (value) {
      case '1':
        return '國內券幣';
      case '12':
        return '國外券幣';
      case '13':
        return '其他';
      case '2':
        return '券幣大小事';
      case '3':
        return '紀念性券幣銷售';
      case '4':
        return '防偽辨識';
      case '14':
        return '其他資訊';
      case '15':
        return '金融文物館';
    }
    return null;
  }

}
