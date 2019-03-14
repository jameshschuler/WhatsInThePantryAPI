import { Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Audit from "./Audit";
import { Item } from "./Item";

@Entity()
export class ItemAmount extends Audit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 255, {
    message: "Item amount must be between 1 and 255 characters."
  })
  name: string;

  @OneToMany(() => Item, item => item.itemAmount)
  items: Item[];
}
