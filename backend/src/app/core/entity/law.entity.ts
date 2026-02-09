export interface LawDto {
  ID: number;
  LawName: string;
  orderby: number;
  language: string;
  file1: string;
  fileName1: string;
  state: boolean;
  CreatedTime: Date;
  CreatedByUser: string;
  UpdatedTime: Date;
  UpdatedByUser: string;
  Detail?: LawDetailDto;
}

export interface LawDetailDto {
  ID: number;
  LawNo: string;
  Content: string;
  CreatedTime: Date;
  CreatedByUser: string;
  UpdatedTime: Date;
  UpdatedByUser: string;
}

