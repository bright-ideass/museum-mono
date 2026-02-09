import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";


@Entity("ICM_A_News", { schema: "dbo" })
export class ICM_A_News {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "Id"
    })
    Id: number;


    @Column("datetime", {
        nullable: true,
        name: "publishStartDate"
    })
    publishStartDate: Date | null;


    @Column("datetime", {
        nullable: true,
        name: "publishEndDate"
    })
    publishEndDate: Date | null;


    @Column("int", {
        nullable: true,
        name: "UnitId"
    })
    UnitId: number | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "title"
    })
    title: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 'MAX',
        name: "content"
    })
    content: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "fileName"
    })
    fileName: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "fileUrl"
    })
    fileUrl: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 10,
        name: "Color"
    })
    Color: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "url"
    })
    url: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 20,
        name: "lang"
    })
    lang: string | null;


    @Column("int", {
        nullable: false,
        name: "Publish"
    })
    Publish: number;


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
        length: 200,
        name: "introduction"
    })
    introduction: string | null;

    @Column("nvarchar", {
        nullable: true,
        length: 20,
        name: "NewsType"
    })
    NewsType: string | null;

    @Column({ default: true })
    state: boolean;

}
