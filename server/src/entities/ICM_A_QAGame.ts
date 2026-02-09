import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ICM_A_QAGame', { schema: 'dbo' })
export class ICM_A_QAGame {

    @PrimaryGeneratedColumn({ type: 'int' }) ID: number;

    @Column('nvarchar', {
        nullable: true, length: 200, name: 'Title',
    }) Title: string;

    @Column('nvarchar', {
        nullable: true, length: 200, name: 'File1',
    }) File1: string;

    @Column('nvarchar', {
        nullable: true, length: 200, name: 'File2',
    }) File2: string;

    @Column('int', {
        nullable: true, name: 'Status',
    }) Status: number;

    @Column('decimal', {
        nullable: true, precision: 18, scale: 0, name: 'Click',
    }) Click: number;

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
