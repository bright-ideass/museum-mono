import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ICM_A_QAGameItem', { schema: 'dbo' })
export class ICM_A_QAGameItem {

    @PrimaryGeneratedColumn({ type: 'int' }) ID: number;

    @Column('int', {
        name: 'Game_ID',
    }) Game_ID: number;

    @Column('nvarchar', {
        nullable: true, length: 50, name: 'Grade',
    }) Grade: string;

    @Column('nvarchar', {
        nullable: true, length: 200, name: 'Title',
    }) Title: string;

    @Column('nvarchar', {
        nullable: true, length: 1000, name: 'Introduction',
    }) Introduction: string;

    @Column('nvarchar', {
        nullable: true, length: 200, name: 'File1',
    }) File1: string;

    @Column('nvarchar', {
        nullable: true, length: 50, name: 'Option1',
    }) Option1: string;

    @Column('nvarchar', {
        nullable: true, length: 50, name: 'Option2',
    }) Option2: string;

    @Column('nvarchar', {
        nullable: true, length: 50, name: 'Option3',
    }) Option3: string;

    @Column('nvarchar', {
        nullable: true, length: 50, name: 'Option4',
    }) Option4: string;

    @Column('nvarchar', {
        nullable: true, length: 50, name: 'Option5',
    }) Option5: string;

    @Column('nvarchar', {
        nullable: true, length: 50, name: 'Option6',
    }) Option6: string;

    @Column('int', {
        nullable: true, name: 'AnsOptionId',
    }) AnsOptionId: number;

    @Column('int', {
        nullable: true, name: 'Status',
    }) Status: number;

    @Column('datetime', {
        nullable: true, default: () => 'getdate()', name: 'CreatedTime',
    }) CreatedTime: Date | null;

    @Column('nvarchar', {
        nullable: true, length: 50, name: 'CreatedByUser',
    })
    CreatedByUser: string | null;

    @Column('datetime', {
        nullable: true, name: 'UpdatedTime',
    }) UpdatedTime: Date | null;

    @Column('nvarchar', {
        nullable: true, length: 50, name: 'UpdatedByUser',
    })
    UpdatedByUser: string | null;

    @Column({ default: true })
    state: boolean;
}
