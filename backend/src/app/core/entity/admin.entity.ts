export interface AdminDTO {

  UserName: string;
  token: string;
  // Template: string;
  //SystemName: string;
  LastLogin: Date;
  Roles: string[];
  DeptName: string;
  //DeptId: string;
  NextTimeout: Date;
  //Timeout: number;
  //AuthSessionToken: string;

  // token?: string;
  // enable: boolean;
  // lastLoginIP?: string;
}

export interface menusDTO {
  Link: string;
  Name: string;
}


export interface cbc_LogDTO {
  Where: string;
  Level?: number;
  Type?: number;
  SubType: string;
  What?: string;
  Memo: string;
  AuthSessionToken?: string;
  ip?: string;
  createDate?: Date;
}
