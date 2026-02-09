import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ICM_A_DataDownload" ,{schema:"dbo" } )
export class ICM_A_DataDownload {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "ID"
    })
    ID:number;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:10,
        name:"mediaType"
        })
    mediaType:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:200,
        name:"Title"
        })
    Title:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length: "MAX",
        name:"content"
        })
    content:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:50,
        name:"Language"
        })
    Language:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:200,
        name:"KeyWords"
        })
    KeyWords:string | null;
        

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
        name:"File1"
        })
    File1:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:200,
        name:"File2"
        })
    File2:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:200,
        name:"File3"
        })
    File3:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:200,
        name:"File4"
        })
    File4:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:200,
        name:"File5"
        })
    File5:string | null;
        

    @Column("decimal",{ 
        nullable:true,
        precision:18,
        scale:0,
        name:"Click"
        })
    Click:number | null;
        

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
