import { Length, MaxLength } from "class-validator";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { ItemAmount } from "./ItemAmount";
import { ItemCategory } from "./ItemCategory";
import { ItemLocation } from "./ItemLocation";
import MyBaseEntity from "./MyBaseEntity";
import PantryItem from "./PantryItem";
import User from "./User";

@Entity()
export default class Item extends MyBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  @Length(1, 255, {
    message: "Item name must be between 1 and 255 characters."
  })
  name: string;

  @Column({ nullable: true })
  @MaxLength(1000, {
    message: "Description cannot be larger than 1000 characters in length."
  })
  description: string;

  @ManyToOne(() => ItemAmount, itemAmount => itemAmount.items)
  defaultItemAmount: ItemAmount;

  @ManyToOne(() => ItemCategory, itemCategory => itemCategory.items)
  itemCategory: ItemCategory;

  @ManyToOne(() => ItemLocation, itemLocation => itemLocation.items)
  defaultItemLocation: ItemLocation;

  @OneToMany(() => PantryItem, pantryItem => pantryItem.item)
  pantryItems: PantryItem[];

  @ManyToOne(() => User, user => user.items)
  user: User;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
