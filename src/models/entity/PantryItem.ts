import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn
} from "typeorm";
import Item from "./Item";
import { ItemAmount } from "./ItemAmount";
import { ItemLocation } from "./ItemLocation";
import MyBaseEntity from "./MyBaseEntity";
import { Pantry } from "./Pantry";

@Entity({ name: "pantry_item" })
export default class PantryItem extends MyBaseEntity {
  @PrimaryColumn({ type: "int" })
  itemId: number;

  @PrimaryColumn({ type: "int" })
  pantryId: number;

  @ManyToOne(() => Item, item => item.pantryItems)
  item: Item;

  @ManyToOne(() => Pantry, pantry => pantry.pantryItems)
  pantry: Pantry;

  @Column()
  price: string;

  @Column()
  unit: string;

  @ManyToOne(() => ItemAmount, itemAmount => itemAmount.items)
  itemAmount: ItemAmount;

  @ManyToOne(() => ItemLocation, itemLocation => itemLocation.items)
  itemLocation: ItemLocation;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
