import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ICM_A_SubCode" ,{schema:"dbo" } )
export class ICM_A_SubCode {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"ID"
        })
    ID:number;
        

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"CodeID"
        })
    CodeID:number;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:50,
        name:"SubCodeName"
        })
    SubCodeName:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:2,
        name:"SubIDNo"
        })
    SubIDNo:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:50,
        name:"page"
        })
    page:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        name:"content"
        })
    content:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:200,
        name:"SubCodeEName"
        })
    SubCodeEName:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        name:"EContent"
        })
    EContent:string | null;
        
}
