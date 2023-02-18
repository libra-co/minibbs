import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Zone {
    @PrimaryGeneratedColumn('uuid')
    zid: string
    @Column()
    zoneName: string
}
