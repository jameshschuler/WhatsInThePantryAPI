import { Length } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Item } from "./Item";

@Entity()
export class ItemCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 255, {
    message: "Item name must be between 1 and 255 characters."
  })
  name: string;

  @OneToMany(() => Item, item => item.itemCategory)
  items: Item[];
}