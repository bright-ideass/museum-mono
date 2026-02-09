import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { ICM_A_LawDetail } from "./ICM_A_LawDetail";


@Entity("ICM_A_Law", { schema: "dbo" })
export class ICM_A_Law {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "ID"
    })
    ID: number;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "LawName"
    })
    LawName: string | null;


    @Column("nvarchar", {
        nullable: true,
        name: "LawHis"
    })
    LawHis: string | null;


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


    @Column("int", {
        nullable: true,
        name: "orderby"
    })
    orderby: number | null;


    @Column("nvarchar", {
        nullable: true,
        length: 10,
        name: "language"
    })
    language: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "file1"
    })
    file1: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "file2"
    })
    file2: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "fileName1"
    })
    fileName1: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "fileName2"
    })
    fileName2: string | null;

    @Column({ default: true })
    state: boolean;

    Detail?: ICM_A_LawDetail;

}
