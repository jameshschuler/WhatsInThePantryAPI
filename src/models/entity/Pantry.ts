import { Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import MyBaseEntity from "./MyBaseEntity";
import PantryItem from "./PantryItem";
import PantryUser from "./PantryUser";

@Entity()
export class Pantry extends MyBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: "255" })
  @Length(1, 255, {
    message: "Pantry name must be between 1 and 255 characters."
  })
  name: string;

  @Column({ default: false })
  isShared: boolean;

  @OneToMany(() => PantryUser, pantryUser => pantryUser.pantry)
  pantryUsers: PantryUser[];

  @OneToMany(() => PantryItem, pantryItem => pantryItem.pantry)
  pantryItems: PantryItem[];
}
