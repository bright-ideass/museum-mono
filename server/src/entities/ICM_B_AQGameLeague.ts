import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('ICM_B_QAGameLeague')
export class ICM_B_QAGameLeague {

    @PrimaryGeneratedColumn({ name: 'id' }) id: number;

    @Column('int', {
        name: 'Game_ID',
    }) Game_ID: number;

    @Column('nvarchar', {
        nullable: true, length: 50, name: 'Grade',
    }) Grade: string;

    @Column('nvarchar', {
        nullable: true, length: 50, name: 'UserName',
    }) UserName: string;

    @Column('int', {
        nullable: true, name: 'score',
    }) Score: number;

    @Column('int', {
        nullable: true, name: 'Percents',
    }) Percents: number;

    @Column('nvarchar', {
        nullable: true, length: 200, name: 'userIP',
    })
    userIP: string | null;

    @Column('datetime', {
        default: () => 'getdate()', name: 'CreatedTime',
    })
    CreatedTime: Date | null;
}
