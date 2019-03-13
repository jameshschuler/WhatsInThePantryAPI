import { IsNotEmpty, Length } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 255, {
    message: "Item name must be between 1 and 255 characters."
  })
  name: string;

  @Column()
  @IsNotEmpty()
  price: string;

  @Column()
  @IsNotEmpty()
  unit: string;

  @Column()
  defaultItemAmountId: number;

  @Column()
  categoryId: number;

  @Column()
  defaultLocationId: number;

  @Column()
  createdBy: number;

  @Column()
  createdDate: Date;

  @Column()
  lastUpdated: Date;
}
