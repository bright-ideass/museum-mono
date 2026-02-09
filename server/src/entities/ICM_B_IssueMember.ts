import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ICM_B_IssueMember" ,{schema:"dbo" } )
export class ICM_B_IssueMember {

    @PrimaryGeneratedColumn({
        name:"id"
        })
    id:number;
        

    @Column("nvarchar",{ 
        nullable:false,
        length:50,
        name:"mail"
        })
    mail:string;
        

    @Column("int",{ 
        nullable:true,
        name:"Issue_No"
        })
    Issue_No:number | null;
        

    @Column("datetime",{ 
        nullable:true,
        default: () => "getdate()",
        name:"CreatedTime"
        })
    CreatedTime:Date | null;
        
}
