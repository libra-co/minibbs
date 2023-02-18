import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Block {
    @PrimaryGeneratedColumn('uuid')
    blid: string
}
