import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ICM_A_BookImgList" ,{schema:"dbo" } )
export class ICM_A_BookImgList {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"ID"
        })
    ID:number;
        

    @Column("int",{ 
        nullable:true,
        name:"BookID"
        })
    BookID:number | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:200,
        name:"imgSrc"
        })
    imgSrc:string | null;
        

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
