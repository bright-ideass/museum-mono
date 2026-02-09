import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'langPipe',
  standalone: true
})
export class LangPipePipe implements PipeTransform {

  transform(value: unknown): unknown {
    switch (value) {
      case 'zh-tw':
        return '中文';
      case 'en-us':
        return '英文';
    }
    return null;
  }

}
