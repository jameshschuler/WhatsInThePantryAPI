import { Length } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ItemLocation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 255, {
    message: "Item name must be between 1 and 255 characters."
  })
  name: string;
}
