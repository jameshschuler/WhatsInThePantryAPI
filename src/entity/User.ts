import { IsEmail, Length } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 255)
  firstName: string;

  @Column()
  @Length(1, 255)
  lastName: string;

  @Column()
  @IsEmail()
  @Length(1, 255)
  email: string;

  @Column()
  @Length(1, 255)
  username: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;
}
