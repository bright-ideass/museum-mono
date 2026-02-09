import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ICM_A_NavigationDetail" ,{schema:"dbo" } )
export class ICM_A_NavigationDetail {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"NavigationId"
        })
    NavigationId:number;
        

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"RoomID"
        })
    RoomID:number;
        

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"WallID"
        })
    WallID:number;
        

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"ExhibitsId"
        })
    ExhibitsId:number;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:20,
        name:"X"
        })
    X:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:20,
        name:"Y"
        })
    Y:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:20,
        name:"scale"
        })
    scale:string | null;
        

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
