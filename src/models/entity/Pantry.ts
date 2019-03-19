import { Column, Entity, Length, PrimaryGeneratedColumn } from "typeorm";
import Audit from "./Audit";

@Entity()
export class Pantry extends Audit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 255, {
    message: "Pantry name must be between 1 and 255 characters."
  })
  name: string;

  @Column({ default: false })
  isShared: boolean;
}
