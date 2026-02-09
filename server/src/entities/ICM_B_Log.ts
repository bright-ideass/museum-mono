import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ICM_B_Log" ,{schema:"dbo" } )
export class ICM_B_Log {

    @PrimaryGeneratedColumn({
        name:"id"
        })
    id:number;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:1000,
        name:"access"
        })
    access:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:20,
        name:"account"
        })
    account:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:20,
        name:"IP"
        })
    IP:string | null;
        

    @Column("smalldatetime",{ 
        nullable:true,
        default: () => "getdate()",
        name:"CreatedTime"
        })
    CreatedTime:Date | null;
        

    @Column("int",{ 
        nullable:true,
        default: () => "(1)",
        name:"show"
        })
    show:number | null;
        
}
