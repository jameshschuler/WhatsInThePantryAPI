import { IsEmail, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Item from "./Item";
import MyBaseEntity from "./MyBaseEntity";
import PantryUser from "./PantryUser";

@Entity()
export default class User extends MyBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  @Length(1, 255, {
    message: "First name must be between 1 and 255 characters."
  })
  firstName: string;

  @Column({ length: 255 })
  @Length(1, 255, {
    message: "Last name must be between 1 and 255 characters."
  })
  lastName: string;

  @Column({ length: 255 })
  @IsEmail({}, { message: "Email must be a valid email address." })
  @Length(1, 255, { message: "Email must be between 1 and 255 characters." })
  email: string;

  @Column({ length: 255 })
  @Length(1, 255, { message: "Username must be between 1 and 255 characters." })
  username: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;

  @Column()
  loginFailureCount: number = 0;

  @Column({ nullable: true })
  lockoutDate?: Date;

  @Column({ nullable: true })
  lastLogin?: Date;

  @OneToMany(() => Item, item => item.user)
  items: Item[];

  @OneToMany(() => PantryUser, pantryUser => pantryUser.user)
  pantryUsers: PantryUser[];
}
