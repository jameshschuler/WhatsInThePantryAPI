import { Length, MaxLength } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Audit from "./Audit";
import { ItemAmount } from "./ItemAmount";
import { ItemCategory } from "./ItemCategory";
import { ItemLocation } from "./ItemLocation";

@Entity()
export class Item extends Audit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 255, {
    message: "Item name must be between 1 and 255 characters."
  })
  name: string;

  @Column({ nullable: true })
  price: string;

  @Column({ nullable: true })
  unit: string;

  @Column({ nullable: true })
  @MaxLength(1000, {
    message: "Description cannot be larger than 1000 characters in length."
  })
  description: string;

  @ManyToOne(() => ItemAmount, itemAmount => itemAmount.items)
  itemAmount: ItemAmount;

  @ManyToOne(() => ItemAmount, itemAmount => itemAmount.items)
  currentItemAmount: ItemAmount;

  @ManyToOne(() => ItemCategory, itemCategory => itemCategory.items)
  itemCategory: ItemCategory;

  @ManyToOne(() => ItemLocation, itemLocation => itemLocation.items)
  itemLocation: ItemLocation;
}
