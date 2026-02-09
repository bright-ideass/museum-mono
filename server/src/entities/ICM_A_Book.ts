import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";


@Entity("ICM_A_Book", { schema: "dbo" })
export class ICM_A_Book {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "ID"
    })
    ID: number;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "bookname"
    })
    bookname: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: "MAX",
        name: "content"
    })
    content: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "user1"
    })
    user1: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "user2"
    })
    user2: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 100,
        name: "org"
    })
    org: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "publishdate"
    })
    publishdate: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "language"
    })
    language: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 20,
        name: "ISBN"
    })
    ISBN: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "File1"
    })
    File1: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "File2"
    })
    File2: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "File3"
    })
    File3: string | null;


    @Column("int", {
        nullable: true,
        name: "orderby"
    })
    orderby: number | null;


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

    @Column({ default: true })
    state: boolean;

}
