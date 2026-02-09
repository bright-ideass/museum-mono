import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";


@Entity("ICM_A_ExhibitsImgList", { schema: "dbo" })
export class ICM_A_ExhibitsImgList {

    @PrimaryGeneratedColumn({
        name: "imgID"
    })
    imgID: number;


    @Column("int", {
        nullable: true,
        name: "ExhibitsId"
    })
    ExhibitsId: number | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "imgType"
    })
    imgType: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "imgSrc"
    })
    imgSrc: string | null;


    @Column("nvarchar", {
        nullable: false,
        length: 200,
        name: "imgName"
    })
    imgName: string;


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

    @Column({ nullable: true, })
    sort: number;

}
