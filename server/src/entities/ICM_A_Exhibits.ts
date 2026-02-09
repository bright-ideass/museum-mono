import { ICM_A_ExhibitsE } from './ICM_A_ExhibitsE';
import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";


@Entity("ICM_A_Exhibits", { schema: "dbo" })
export class ICM_A_Exhibits {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "ExhibitsId"
    })
    ExhibitsId: number;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "InputId"
    })
    InputId: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "InputNo"
    })
    InputNo: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "ExhibitsName"
    })
    ExhibitsName: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 10,
        name: "ShowStarttime"
    })
    ShowStarttime: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 10,
        name: "ShowEndtime"
    })
    ShowEndtime: string | null;


    @Column("int", {
        nullable: true,
        name: "onForever"
    })
    onForever: number | null;


    @Column("int", {
        nullable: false,
        name: "PeriodID"
    })
    PeriodID: number;


    @Column("int", {
        nullable: true,
        name: "PeriodTypeID"
    })
    PeriodTypeID: number | null;


    @Column("int", {
        nullable: true,
        name: "ExhibitsType"
    })
    ExhibitsType: number | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "ExhibitsDoc"
    })
    ExhibitsDoc: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 20,
        name: "SendingCount"
    })
    SendingCount: string;


    @Column("nvarchar", {
        nullable: true,
        length: 100,
        name: "Dollar"
    })
    Dollar: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "Area"
    })
    Area: string | null;


    @Column("int", {
        nullable: true,
        name: "IssueTimeDC"
    })
    IssueTimeDC: number | null;


    @Column("int", {
        nullable: true,
        name: "PlateYearDC"
    })
    PlateYearDC: number | null;


    @Column("nvarchar", {
        nullable: true,
        length: 20,
        name: "IssueTime"
    })
    IssueTime: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 20,
        name: "PlateYear"
    })
    PlateYear: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "size_L"
    })
    size_L: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "size_W"
    })
    size_W: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "size_H"
    })
    size_H: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "Obj_Type"
    })
    Obj_Type: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "Obj_color1"
    })
    Obj_color1: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "Obj_color2"
    })
    Obj_color2: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "Weight"
    })
    Weight: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "Diameter"
    })
    Diameter: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "Keywords"
    })
    Keywords: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 4000,
        name: "Exhibits_Content"
    })
    Exhibits_Content: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 4000,
        name: "Exhibits_Story"
    })
    Exhibits_Story: string | null;


    @Column("int", {
        nullable: true,
        name: "ShowWeb"
    })
    ShowWeb: number | null;


    @Column("int", {
        nullable: true,
        name: "UseType"
    })
    UseType: number | null;


    @Column("nvarchar", {
        nullable: true,
        length: 100,
        name: "Location"
    })
    Location: string;


    @Column("nvarchar", {
        nullable: true,
        length: 20,
        name: "ImgDpi"
    })
    ImgDpi: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 20,
        name: "InvalidDate"
    })
    InvalidDate: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 20,
        name: "EndUseDate"
    })
    EndUseDate: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "CC"
    })
    CC: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "FakeWeb"
    })
    FakeWeb: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 4000,
        name: "Note"
    })
    Note: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "imgDescr1"
    })
    imgDescr1: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "imgDescr2"
    })
    imgDescr2: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "imgDescr3"
    })
    imgDescr3: string | null;


    @Column("int", {
        nullable: true,
        name: "haveEnlarge"
    })
    haveEnlarge: number | null;


    @Column("int", {
        nullable: true,
        name: "haveSurround"
    })
    haveSurround: number | null;


    @Column("int", {
        nullable: true,
        name: "haveThumb"
    })
    haveThumb: number | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "ImgName"
    })
    ImgName: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "SurroundSwf"
    })
    SurroundSwf: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "EnlargeImg1"
    })
    EnlargeImg1: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "EnlargeImg2"
    })
    EnlargeImg2: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "ThumbnailImg"
    })
    ThumbnailImg: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "WebImg"
    })
    WebImg: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "TimelineImg"
    })
    TimelineImg: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "Voice"
    })
    Voice: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "RelatedLink"
    })
    RelatedLink: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: "MAX",
        name: "ExtContent"
    })
    ExtContent: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "obj_material"
    })
    obj_material: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "ExhibitsVers"
    })
    ExhibitsVers: string | null;


    @Column("int", {
        nullable: true,
        name: "order2"
    })
    order2: number | null;


    @Column("int", {
        nullable: true,
        name: "webType2"
    })
    webType2: number | null;


    @Column("int", {
        nullable: true,
        name: "webSubType2"
    })
    webSubType2: number | null;


    @Column("int", {
        nullable: true,
        name: "showWeb2"
    })
    showWeb2: number | null;


    @Column("int", {
        nullable: true,
        name: "order1"
    })
    order1: number | null;


    @Column("int", {
        nullable: true,
        name: "webType1"
    })
    webType1: number | null;


    @Column("int", {
        nullable: true,
        name: "webSubType1"
    })
    webSubType1: number | null;


    @Column("int", {
        nullable: true,
        name: "showWeb1"
    })
    showWeb1: number | null;


    @Column("int", {
        nullable: true,
        name: "order0"
    })
    order0: number | null;


    @Column("int", {
        nullable: true,
        name: "webType0"
    })
    webType0: number | null;


    @Column("int", {
        nullable: true,
        name: "webSubType0"
    })
    webSubType0: number | null;


    @Column("int", {
        nullable: true,
        name: "showWeb0"
    })
    showWeb0: number | null;


    @Column("nvarchar", {
        nullable: true,
        length: 500,
        name: "ebook"
    })
    ebook: string | null;


    @Column("int", {
        nullable: true,
        name: "IsPublish"
    })
    IsPublish: number | null;


    @Column("datetime", {
        nullable: true,
        default: () => "getdate()",
        name: "CreatedTime"
    })
    CreatedTime: Date | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "CreatedByUser"
    })
    CreatedByUser: string | null;


    @Column("datetime", {
        nullable: true,
        name: "UpdatedTime"
    })
    UpdatedTime: Date | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "UpdatedByUser"
    })
    UpdatedByUser: string | null;


    @Column("float", {
        nullable: true,
        precision: 53,
        name: "dollarNum"
    })
    dollarNum: number | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "googleMap"
    })
    googleMap: string | null;

    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "URLlink"
    })
    URLlink: string | null;

    @Column("int", {
        nullable: true,
        name: "skuBrowsing"
    })
    skuBrowsing: string | null;

    en: ICM_A_ExhibitsE;
}
