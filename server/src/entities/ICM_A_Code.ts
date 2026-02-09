import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ICM_A_Code" ,{schema:"dbo" } )
export class ICM_A_Code {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"ID"
        })
    ID:number;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:20,
        name:"Code"
        })
    Code:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:100,
        name:"CodeName"
        })
    CodeName:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:2,
        name:"IDNo"
        })
    IDNo:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:50,
        name:"imgSrc"
        })
    imgSrc:string | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:100,
        name:"CodeEName"
        })
    CodeEName:string | null;
        
}
