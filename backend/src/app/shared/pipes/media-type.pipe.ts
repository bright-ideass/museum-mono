import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mediaType',
  standalone: true
})
export class MediaTypePipe implements PipeTransform {


  transform(value: unknown): string {
    switch (value) {
      case '1':
        return '桌布下載';
      case '3':
        return '互動遊戲';
      case '5':
        return '學習單';
      case '6':
        return '影片單元';
    }
    return '';
  }

}
