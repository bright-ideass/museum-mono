export interface NavigationDto {
  NavigationId: number;
  Navigation: string;
  showDate1: Date;
  showDate2: Date;
  note: string;
  NavigationType: string;
  ImgSrcMain1: string;
  ImgSrcMain: string;
  ImgSrc: string;
  Lang: string;
  room1_Name: string;
  room1_desc: string;
  room1_img0: string;
  room1_img1: string;
  room1_img2: string;
  room1_img3: string;
  room1_img4: string;
  room1_voice: string;
  room2_Name: string;
  room2_desc: string;
  room2_img0: string;
  room2_img1: string;
  room2_img2: string;
  room2_img3: string;
  room2_img4: string;
  room2_voice: string;
  room3_Name: string;
  room3_desc: string;
  room3_img0: string;
  room3_img1: string;
  room3_img2: string;
  room3_img3: string;
  room3_img4: string;
  room3_voice: string;
  mainVoice: string;
  CssType: string;
  CreatedTime: Date;
  CreatedByUser: string;
  UpdatedTime: Date;
  UpdatedByUser: string;
}

export interface exhListDto {
  Exhibits: NavigationExhibitsDto[];
  room: NavigationExhibitsDto[];
}
export interface NavigationExhDto {
  ExhibitsId: number;
  ExhibitsName: string;
}

export interface NavigationExhibitsDto {
  id: number;
  NavigationId: number;
  ExhibitsId: number;
  ExhibitsName: string;
  Navigation: string;
  RoodId: number;
  Sort: number;
}

export interface NavigationExhSaveDto {
  room1: NavigationExhDto[];
  room2: NavigationExhDto[];
  room3: NavigationExhDto[];
}
