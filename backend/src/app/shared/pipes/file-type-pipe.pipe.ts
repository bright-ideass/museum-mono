import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileTypePipe',
  standalone: true
})
export class FileTypePipePipe implements PipeTransform {

  transform(value: unknown): unknown {
    switch (value) {
      case 'bannerImg':
        return 'image/*';
      case 'newsImg':
        return 'image/*';
      case 'newsFile':
        return 'application/pdf,.doc, .docx';
      case 'bookFile1':
        return 'image/*';
      case 'bookFile2':
        return 'application/pdf';
      case 'media1':
        return 'image/*';
      case 'media2':
        return 'image/*';
      case 'media3':
        return 'image/*';
      case 'media4':
        return 'image/*';
      case 'media5':
        return 'image/*';
      case 'studyImg':
        return 'image/*';
      case 'studyPdf':
        return 'application/pdf';
      case 'videoImg':
        return 'image/*';
      case 'videoFile':
        return 'video/*';
      case 'gameImg':
        return 'image/*';
      case 'gameZip':
        return 'application/zip';
      case 'gameQa':
        return 'image/*';
      case 'gameQaBk':
        return 'image/*';
      case 'gameItemImg':
        return 'image/*';
      case 'thumbnailImg':
        return 'image/*';
      case 'enlargeImg1':
        return 'image/*';
      case 'enlargeImg2':
        return 'image/*';
      case 'webImg':
        return 'image/*';
      case 'eBook':
        return 'application/zip';
      case 'VR_Img':
        return 'image/*';
      case 'VR_voice':
        return 'audio/*';
    }
    return null;
  }

}

@Pipe({
  name: 'fileNamePipe',
  standalone: true
})
export class FileNamePipePipe implements PipeTransform {

  transform(value: unknown): unknown {
    switch (value) {
      case 'bannerImg':
        return '封面圖';
      case 'newsImg':
        return '上傳圖片';
      case 'newsFile':
        return '上傳附件檔(PDF,DOC)';
      case 'bookFile1':
        return '上傳縮圖';
      case 'bookFile2':
        return '上傳附件檔(PDF)';
      case 'media1':
        return '上傳800x600圖片';
      case 'media2':
        return '上傳1024x768圖片';
      case 'media3':
        return '上傳1280x1024圖片';
      case 'media4':
        return '上傳1440x900圖片';
      case 'media5':
        return '上傳1920x1200圖片';
      case 'studyImg':
        return '縮圖上傳（比例4:3）';
      case 'studyPdf':
        return '學習單上傳（PDF）';
      case 'videoImg':
        return '縮圖上傳（比例4:3）';
      case 'videoFile':
        return '影片上傳（mp4）';
      case 'gameImg':
        return '上傳縮圖';
      case 'gameZip':
        return '上傳遊戲壓縮檔(ZIP)';
      case 'gameQa':
        return '問答圖片（比例4:3）';
      case 'gameQaBk':
        return '問答背景圖片';
      case 'gameItemImg':
        return '問答圖片';
      case 'thumbnailImg':
        return '封面圖上傳';
      case 'enlargeImg1':
        return '圖案正面';
      case 'enlargeImg2':
        return '圖案背面';
      case 'webImg':
        return '展項照片上傳';
      case 'eBook':
        return '電子書上傳(zip)';
      case 'VR_Img':
        return '海報上傳';
      case 'VR_voice':
        return '語音上傳';
    }
    return null;
  }

}
