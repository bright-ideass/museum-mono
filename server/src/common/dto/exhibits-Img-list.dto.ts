import { IsJSON, isJSON, IsNotEmpty, isNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, IsUUID } from "class-validator";

export class adminLoginDTO {
    @IsOptional() SystemId: string;
    @IsNotEmpty() RandomNo: string;
    @IsOptional() Ip: string;
}

export class adminAuthDTO {
    UserName: string;
    Timeout: number;
    AuthSessionToken: string;
    DeptName: string;
    LastLogin: Date;
    NextTimeout: Date;
    Roles: [string];
}

export class exhibitsImgListDTO {
    @IsOptional() imgID: number
    @IsNotEmpty() ExhibitsId: number
    @IsOptional() imgType: string;
}

export class NavigationExhSaveDto {
    room1: NavigationExhibitsDto[];
    room2: NavigationExhibitsDto[];
    room3: NavigationExhibitsDto[];
}

export class NavigationExhibitsDto {
    id: number;
    NavigationId: number;
    ExhibitsId: number;
    ExhibitsName: string;
    Navigation: string;
    RoodId: number;
    Sort: number;
}