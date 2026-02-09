import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ICM_B_CheckLog" ,{schema:"dbo" } )
export class ICM_B_CheckLog {

    @PrimaryGeneratedColumn({
         name:"ID" })
    ID:number;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:100,
        name:"fileName"
        })
    fileName:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:1000,
        name:"path"
        })
    path:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:500,
        name:"access"
        })
    access:string | null;
        

    @Column("smalldatetime",{ 
        nullable:true,
        default: () => "getdate()",
        name:"CreatedTime"
        })
    CreatedTime:Date | null;
        

    @Column("int",{ 
        nullable:true,
        name:"preID"
        })
    preID:number | null;
        
}
