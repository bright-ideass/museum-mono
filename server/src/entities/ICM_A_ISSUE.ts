import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ICM_A_ISSUE" ,{schema:"dbo" } )
export class ICM_A_ISSUE {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"issue_No"
        })
    issue_No:number;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:500,
        name:"issue_name"
        })
    issue_name:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:500,
        name:"issue_Ename"
        })
    issue_Ename:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        name:"issue_content"
        })
    issue_content:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:500,
        name:"issue_Path"
        })
    issue_Path:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:500,
        name:"zip_Path"
        })
    zip_Path:string | null;
        

    @Column("datetime",{ 
        nullable:true,
        name:"issue_Time"
        })
    issue_Time:Date | null;
        

    @Column("nchar",{ 
        nullable:true,
        length:10,
        name:"issue_SendTime"
        })
    issue_SendTime:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:50,
        name:"issue_state"
        })
    issue_state:string | null;
        

    @Column("datetime",{ 
        nullable:true,
        default: () => "getdate()",
        name:"CreatedTime"
        })
    CreatedTime:Date | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:20,
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
        length:20,
        name:"UpdatedByUser"
        })
    UpdatedByUser:string | null;
        

    @Column("numeric",{ 
        nullable:true,
        precision:18,
        scale:0,
        name:"sendNo"
        })
    sendNo:number | null;
        
}
