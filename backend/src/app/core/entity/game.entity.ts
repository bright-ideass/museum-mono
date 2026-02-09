export interface QaGameDto {
  ID: number;
  Title: string;
  File1: string;
  File2: string;
  Status: number;
  CreatedTime: Date;
  CreatedByUser: string;
  UpdatedTime: Date;
  UpdatedByUser: string;
}



export interface QaGameItemDto {
  ID: number;
  Game_ID: number;
  Grade: string;
  Title: string;
  Introduction: string;
  File1: string;
  Option1: string;
  Option2: string;
  Option3: string;
  Option4: string;
  Option5: string;
  Option6: string;
  AnsOptionId: number;
  Status: number;
  CreatedTime: Date;
  CreatedByUser: string;
  UpdatedTime: Date;
  UpdatedByUser: string;
}
