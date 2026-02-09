import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ICM_B_GroupMenu" ,{schema:"dbo" } )
export class ICM_B_GroupMenu {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"GroupID"
        })
    GroupID:number;
        

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"NodeId"
        })
    NodeId:number;
        
}
