import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ICM_A_ExhibitsE" ,{schema:"dbo" } )
export class ICM_A_ExhibitsE {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"ExhibitsId"
        })
    ExhibitsId:number;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:400,
        name:"ExhibitsName"
        })
    ExhibitsName:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:100,
        name:"IssueTime"
        })
    IssueTime:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:100,
        name:"PlateYear"
        })
    PlateYear:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:50,
        name:"size_L"
        })
    size_L:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:50,
        name:"size_W"
        })
    size_W:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:50,
        name:"size_H"
        })
    size_H:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:200,
        name:"Obj_Type"
        })
    Obj_Type:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:200,
        name:"Obj_color1"
        })
    Obj_color1:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:200,
        name:"Obj_color2"
        })
    Obj_color2:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:100,
        name:"Weight"
        })
    Weight:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:100,
        name:"Diameter"
        })
    Diameter:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:100,
        name:"Dollar"
        })
    Dollar:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:400,
        name:"Area"
        })
    Area:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:500,
        name:"obj_material"
        })
    obj_material:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:500,
        name:"ExhibitsVers"
        })
    ExhibitsVers:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:100,
        name:"SendingCount"
        })
    SendingCount:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:300,
        name:"FakeWeb"
        })
    FakeWeb:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:200,
        name:"WebImg"
        })
    WebImg:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:200,
        name:"TimelineImg"
        })
    TimelineImg:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:500,
        name:"ebook"
        })
    ebook:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"isPublish"
        })
    isPublish:number | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:200,
        name:"imgDescr1"
        })
    imgDescr1:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:200,
        name:"imgDescr2"
        })
    imgDescr2:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        name:"Exhibits_Content"
        })
    Exhibits_Content:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:200,
        name:"imgDescr3"
        })
    imgDescr3:string | null;
        
}
