import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ICM_B_CheckReport" ,{schema:"dbo" } )
export class ICM_B_CheckReport {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"ID"
        })
    ID:number;
        

    @Column("smalldatetime",{ 
        nullable:true,
        name:"checkTime"
        })
    checkTime:Date | null;
        
}
