import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ICM_B_Stastics" ,{schema:"dbo" } )
export class ICM_B_Stastics {

    @PrimaryGeneratedColumn({
        name:"id"
        })
    id:number;
        

    @Column("nvarchar",{ 
        nullable:false,
        length:50,
        name:"Type"
        })
    Type:string;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:50,
        name:"subType"
        })
    subType:string;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:200,
        name:"userIP"
        })
    userIP:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:400,
        name:"links"
        })
    links:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:100,
        name:"url"
        })
    url:string | null;
        

    @Column("datetime",{ 
        nullable:true,
        default: () => "getdate()",
        name:"CreatedTime"
        })
    CreatedTime:Date | null;
        
}
