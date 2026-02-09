import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";


@Entity("ICM_A_WebBanner", { schema: "dbo" })
export class ICM_A_WebBanner {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "ID"
    })
    ID: number;


    @Column("nvarchar", {
        nullable: true,
        length: 500,
        name: "imgSrc"
    })
    imgSrc: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 500,
        name: "imgName"
    })
    imgName: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 500,
        name: "imgUrl"
    })
    imgUrl: string | null;


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
        name: "lang"
    })
    lang: string | null;


    @Column({
        nullable: true,
        type: "int",
        name: "sortId"
    })
    sortId: number | null;

    @Column({ default: true })
    state: boolean;

}
