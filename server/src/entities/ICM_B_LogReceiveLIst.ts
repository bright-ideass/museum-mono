import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ICM_B_LogReceiveLIst" ,{schema:"dbo" } )
export class ICM_B_LogReceiveLIst {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:100,
        name:"name"
        })
    name:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:100,
        name:"mail"
        })
    mail:string | null;
        

    @Column("datetime",{ 
        nullable:true,
        default: () => "getdate()",
        name:"CreatedTime"
        })
    CreatedTime:Date | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:50,
        name:"CreatedByUser"
        })
    CreatedByUser:string | null;
        

    @Column("datetime",{ 
        nullable:true,
        name:"UpdatedTime"
        })
    UpdatedTime:Date | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:50,
        name:"UpdatedByUser"
        })
    UpdatedByUser:string | null;
        
}
