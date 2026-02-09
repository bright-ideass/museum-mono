export interface FaqDto {
  id: number;
  faq_type: string;
  language: string;
  question: string;
  answer: string;
  orderby: number;
  CreatedTime: Date;
  CreatedByUser: string;
  UpdatedTime: Date;
  UpdatedByUser: string;
}

export interface FaqTypeDto {
  ID: number;
  code: string;
  lang: string;
}