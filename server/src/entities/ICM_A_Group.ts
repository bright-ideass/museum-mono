import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ICM_A_Group" ,{schema:"dbo" } )
export class ICM_A_Group {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"GroupID"
        })
    GroupID:number;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:50,
        name:"GroupName"
        })
    GroupName:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"Status"
        })
    Status:number | null;
        

    @Column("datetime",{ 
        nullable:true,
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
