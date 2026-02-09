import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitPipe',
  standalone: true
})
export class UnitPipePipe implements PipeTransform {

  transform(value: unknown): unknown {
    switch (value) {
      case 1:
        return '業務局';
      case 2:
        return '發行局';
      case 3:
        return '外匯局';
      case 4:
        return '國庫局';
      case 5:
        return '金融業務檢查處';
      case 6:
        return '經濟研究處';
      case 7:
        return '秘書處';
      case 8:
        return '會計處';
      case 9:
        return '資訊處';
      case 10:
        return '人事室';
      case 11:
        return '政風室';
      case 12:
        return '法務室';
      case 13:
        return '中央印製廠';
      case 14:
        return '中央造幣廠';
    }
    return null;
  }

}
