import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";


@Entity("ICM_A_Navigation", { schema: "dbo" })
export class ICM_A_Navigation {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "NavigationId"
    })
    NavigationId: number;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "Navigation"
    })
    Navigation: string | null;


    @Column("datetime", {
        nullable: true,
        name: "showDate1"
    })
    showDate1: Date | null;


    @Column("datetime", {
        nullable: true,
        name: "showDate2"
    })
    showDate2: Date | null;


    @Column("nvarchar", {
        nullable: true,
        length: 'MAX',
        name: "note"
    })
    note: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "NavigationType"
    })
    NavigationType: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "ImgSrcMain1"
    })
    ImgSrcMain1: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "ImgSrcMain"
    })
    ImgSrcMain: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "ImgSrc"
    })
    ImgSrc: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 10,
        name: "Lang"
    })
    Lang: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room1_Name"
    })
    room1_Name: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 'MAX',
        name: "room1_desc"
    })
    room1_desc: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room1_img0"
    })
    room1_img0: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room1_img1"
    })
    room1_img1: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room1_img2"
    })
    room1_img2: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room1_img3"
    })
    room1_img3: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room1_img4"
    })
    room1_img4: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room2_Name"
    })
    room2_Name: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 'MAX',
        name: "room2_desc"
    })
    room2_desc: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room2_img0"
    })
    room2_img0: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room2_img1"
    })
    room2_img1: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room2_img2"
    })
    room2_img2: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room2_img3"
    })
    room2_img3: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room2_img4"
    })
    room2_img4: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room3_Name"
    })
    room3_Name: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 'MAX',
        name: "room3_desc"
    })
    room3_desc: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room3_img0"
    })
    room3_img0: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room3_img1"
    })
    room3_img1: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room3_img2"
    })
    room3_img2: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room3_img3"
    })
    room3_img3: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room3_img4"
    })
    room3_img4: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room4_Name"
    })
    room4_Name: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 500,
        name: "room4_desc"
    })
    room4_desc: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room4_img0"
    })
    room4_img0: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room4_img1"
    })
    room4_img1: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room4_img2"
    })
    room4_img2: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room4_img3"
    })
    room4_img3: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room4_img4"
    })
    room4_img4: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room5_Name"
    })
    room5_Name: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 500,
        name: "room5_desc"
    })
    room5_desc: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room5_img0"
    })
    room5_img0: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room5_img1"
    })
    room5_img1: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room5_img2"
    })
    room5_img2: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room5_img3"
    })
    room5_img3: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room5_img4"
    })
    room5_img4: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room5_voice"
    })
    room5_voice: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room4_voice"
    })
    room4_voice: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room3_voice"
    })
    room3_voice: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room2_voice"
    })
    room2_voice: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "room1_voice"
    })
    room1_voice: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "mainVoice"
    })
    mainVoice: string | null;


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

    @Column("nvarchar", {
        nullable: true,
        length: 20,
        name: "CssType"
    })
    CssType: string | null;

    @Column({ default: true })
    state: boolean;

}
