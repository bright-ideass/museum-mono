import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ICM_C_MenuTree" ,{schema:"dbo" } )
export class ICM_C_MenuTree {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"NodeId"
        })
    NodeId:number;
        

    @Column("int",{ 
        nullable:true,
        name:"ParentId"
        })
    ParentId:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"Status"
        })
    Status:number | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:100,
        name:"Name"
        })
    Name:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"OrderNum"
        })
    OrderNum:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:5,
        name:"HavePage"
        })
    HavePage:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:5,
        name:"ShowInMenu"
        })
    ShowInMenu:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:3000,
        name:"Url"
        })
    Url:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:20,
        name:"Target"
        })
    Target:string | null;
        
}
