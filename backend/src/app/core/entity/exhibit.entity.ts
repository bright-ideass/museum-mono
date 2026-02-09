export interface ExhibitDto {
  ExhibitsId: number;
  InputId: string;
  InputNo: string;
  ExhibitsName: string;
  ShowStarttime: string;
  ShowEndtime: string;
  onForever: number;
  PeriodID: number;
  PeriodTypeID: number;
  ExhibitsType: number;
  ExhibitsDoc: string;
  SendingCount: string;
  Dollar: string;
  Area: string;
  IssueTimeDC: number;
  PlateYearDC: number;
  size_L: string;
  size_H: string;
  size_W: string;
  Obj_Type: string;
  Obj_color1: string;
  Obj_color2: string;
  Weight: string;
  Diameter: string;
  Keywords: string;
  Exhibits_Content: string;
  Exhibits_Story: string;
  ShowWeb: number;
  UseType: number;
  Location: string;
  ImgDpi: string;
  InvalidDate: string;
  EndUseDate: string;
  CC: string;
  FakeWeb: string;
  Note: string;
  imgDescr1: string;
  imgDescr2: string;
  imgDescr3: string;
  haveEnlarge: number;
  haveSurround: number;
  haveThumb: number;
  ImgName: string;
  SurroundSwf: string;
  EnlargeImg1: string;
  EnlargeImg2: string;
  ThumbnailImg: string;
  WebImg: string;
  TimelineImg: string;
  Voice: string;
  RelatedLink: string;
  ExtContent: string;
  obj_material: string;
  ExhibitsVers: string;
  order2: number;
  webType2: number;
  webSubType2: number;
  showWeb2: number;
  order1: number;
  webType1: number;
  webSubType1: number;
  showWeb1: number;
  order0: number;
  webType0: number;
  webSubType0: number;
  showWeb0: number;
  ebook: string;
  IsPublish: number;

  CreatedTime: Date;
  CreatedByUser: string;
  UpdatedTime: Date;
  UpdatedByUser: string;

  dollarNum: number;
  googleMap: string;
  URLlink: string;
  skuBrowsing: number;
}


export interface ExhibitPeriodTypeDto {
  ID: number;
  CodeName?: string;
  SubCodeName?: string;
}

export interface ExhibitImgListDto {
  imgID?: number;
  ExhibitsId?: number;
  imgType?: string;
  imgSrc: string;
  imgName: string;
  sort: number;
}

export interface ExhibitPreviewDto {
  ExhibitsId: number;
  ExhibitsName: string;
  Dollar: string;
  Area: string;
  IssueTime: string;
  PlateYear: string;
  size_L: string | null;
  size_W: string | null;
  Obj_Type: string;
  Obj_color1: string | null;
  Obj_color2: string | null;
  Weight: string;
  Diameter: number;
  Exhibits_Story: string;
  imgDescr1: string;
  imgDescr2: string;
  EnlargeImg1: string;
  EnlargeImg2: string;
  RelatedLink: string | null;
  ExtContent: string | null;
  obj_material: string;
  ExhibitsVers: string;
  googleMap: string | null;
}
