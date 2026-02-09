import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ICM_B_ExhibitsVisit" ,{schema:"dbo" } )
export class ICM_B_ExhibitsVisit {

    @PrimaryGeneratedColumn({
        name:"id"
        })
    id:number;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:20,
        name:"type"
        })
    type:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"ExhibitsID"
        })
    ExhibitsID:number | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:50,
        name:"userIP"
        })
    userIP:string | null;
        

    @Column("datetime",{ 
        nullable:true,
        default: () => "getdate()",
        name:"CreatedTime"
        })
    CreatedTime:Date | null;
        
}
