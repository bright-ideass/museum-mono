import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class cbcLog {
    @PrimaryGeneratedColumn({ comment: '主鍵' }) logId: number;
    @CreateDateColumn({ nullable: true }) createDate: Date;
    @Column({ nullable: true, comment: 'where' }) Where: string;
    @Column({ nullable: true, comment: 'Level' }) Level: number;
    @Column({ nullable: true, comment: 'Type' }) Type: number;
    @Column({ nullable: true, comment: 'SubType' }) SubType: string;
    @Column({ nullable: true, comment: 'What' }) What: string;
    @Column({ nullable: true, comment: 'Memo' }) Memo: string;
    @Column({ nullable: true, comment: 'AuthSessionToken' }) AuthSessionToken: string;
    @Column({ nullable: true, comment: 'ip' }) ip: string;
}
