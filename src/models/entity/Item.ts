import { Exclude } from "class-transformer";
import { Length } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { ItemAmount } from "./ItemAmount";
import { ItemCategory } from "./ItemCategory";
import { ItemLocation } from "./ItemLocation";

@Entity()
export class Item extends BaseEntity {
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

  @ManyToOne(() => ItemAmount, itemAmount => itemAmount.items)
  itemAmount: ItemAmount;

  @ManyToOne(() => ItemCategory, itemCategory => itemCategory.items)
  itemCategory: ItemCategory;

  @ManyToOne(() => ItemLocation, itemLocation => itemLocation.items)
  itemLocation: ItemLocation;

  @Exclude()
  @Column()
  createdBy: number;

  @Column()
  createdDate: Date;

  @Column()
  lastUpdated: Date;
}
