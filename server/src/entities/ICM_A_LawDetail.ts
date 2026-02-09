import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ICM_A_LawDetail" ,{schema:"dbo" } )
export class ICM_A_LawDetail {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"LawSubID"
        })
    LawSubID:number;
        

    @Column("int",{ 
        nullable:true,
        name:"ID"
        })
    ID:number | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:100,
        name:"LawNo"
        })
    LawNo:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length: "MAX", 
        name:"Content"
        })
    Content:string | null;
        

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
