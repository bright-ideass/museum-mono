import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ICM_A_Feedback" ,{schema:"dbo" } )
export class ICM_A_Feedback {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:20,
        name:"SendName"
        })
    SendName:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:50,
        name:"email"
        })
    email:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:200,
        name:"Sendtitle"
        })
    Sendtitle:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        name:"content"
        })
    content:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:20,
        name:"tel"
        })
    tel:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:200,
        name:"addr"
        })
    addr:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        name:"Replycontent"
        })
    Replycontent:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"Status"
        })
    Status:number | null;
        

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
        

    @Column("varchar",{ 
        nullable:true,
        length:15,
        name:"IP"
        })
    IP:string | null;
        
}
