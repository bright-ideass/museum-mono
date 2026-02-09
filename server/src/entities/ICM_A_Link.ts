import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ICM_A_Link" ,{schema:"dbo" } )
export class ICM_A_Link {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"Id"
        })
    Id:number;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:200,
        name:"Title"
        })
    Title:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:50,
        name:"Area"
        })
    Area:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:200,
        name:"ImgSrc"
        })
    ImgSrc:string | null;
        

    @Column("datetime",{ 
        nullable:true,
        name:"startDate"
        })
    startDate:Date | null;
        

    @Column("datetime",{ 
        nullable:true,
        name:"endDate"
        })
    endDate:Date | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:200,
        name:"Url"
        })
    Url:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        name:"content"
        })
    content:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:400,
        name:"language"
        })
    language:string | null;
        

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
