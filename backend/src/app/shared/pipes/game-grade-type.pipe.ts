import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gameGradeType',
  standalone: true
})
export class GameGradeTypePipe implements PipeTransform {

  transform(value: unknown): unknown {
    switch (value) {
      case 'BASIC':
        return '初級';
      case 'MIDDLE':
        return '中級';
      case 'ADVANCED':
        return '高級';
    }
    return null;
  }

}
