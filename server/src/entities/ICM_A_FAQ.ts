import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ICM_A_FAQ" ,{schema:"dbo" } )
export class ICM_A_FAQ {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("int",{ 
        nullable:true,
        name:"UnitID"
        })
    UnitID:number | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length: "MAX", 
        name:"question"
        })
    question:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length: "MAX", 
        name:"answer"
        })
    answer:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:50,
        name:"faq_type"
        })
    faq_type:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:50,
        name:"language"
        })
    language:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"orderby"
        })
    orderby:number | null;
        

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

    @Column({ default: true })
    state: boolean;    
}
