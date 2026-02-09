export interface BookDto {
  ID: number;
  bookname: string;
  user1: string;
  user2: string;
  org: string;
  publishdate: string;
  language: string;
  ISBN: string;
  content: string;
  File1: string;
  File2: string;
  orderby: number;

  CreatedTime: Date;
  CreatedByUser: string;
  UpdatedTime: Date;
  UpdatedByUser: string;
  state: boolean;
}
