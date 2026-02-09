export interface NewsDto {
  Id: number;
  UnitId: number
  title: string;
  fileName: string;
  fileUrl: string;
  Color: string;
  url: string;
  lang: string;
  Publish: number;
  introduction: string;
  NewsType: string;
  publishStartDate: Date;
  publishEndDate: Date;
  CreatedTime: Date;
  CreatedByUser: string;
  UpdatedTime: Date;
  UpdatedByUser: string;
}
