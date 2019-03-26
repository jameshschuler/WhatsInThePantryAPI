import { Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Item from "./Item";
import MyBaseEntity from "./MyBaseEntity";
import PantryItem from "./PantryItem";

@Entity()
export class ItemAmount extends MyBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 255, {
    message: "Item amount must be between 1 and 255 characters."
  })
  name: string;

  @OneToMany(() => Item, item => item.defaultItemAmount)
  items: Item[];

  @OneToMany(() => PantryItem, pantryItem => pantryItem.itemAmount)
  pantryItems: PantryItem[];
}
