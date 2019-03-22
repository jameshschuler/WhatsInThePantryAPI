import { Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Item from "./Item";
import MyBaseEntity from "./MyBaseEntity";

@Entity()
export class ItemLocation extends MyBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 255, {
    message: "Item name must be between 1 and 255 characters."
  })
  name: string;

  @OneToMany(() => Item, item => item.itemLocation)
  items: Item[];
}
