import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";


@Entity("ICM_A_NavigationExhibits", { schema: "dbo" })
export class ICM_A_NavigationExhibits {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;

    @Column("int", {
        nullable: false,
        primary: true,
        name: "NavigationId"
    })
    NavigationId: number;


    @Column("int", {
        nullable: false,
        primary: true,
        name: "ExhibitsId"
    })
    ExhibitsId: number;


    @Column("nvarchar", {
        nullable: false,
        length: 200,
        name: "ExhibitsName"
    })
    ExhibitsName: string;


    @Column("nvarchar", {
        nullable: true,
        length: 200,
        name: "Navigation"
    })
    Navigation: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 20,
        name: "CreatedByUser"
    })
    CreatedByUser: string | null;


    @Column("nvarchar", {
        nullable: true,
        length: 20,
        name: "UpdatedByUser"
    })
    UpdatedByUser: string | null;

    @Column("int", {
        nullable: true,
        name: "RoodId"
    })
    RoodId: number | null;

    @Column("int", {
        nullable: true,
        name: "Sort"
    })
    Sort: number | null;

}
