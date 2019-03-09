import { IsEmail, Length } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 255, {
    message: "First name must be between 1 and 255 characters."
  })
  firstName: string;

  @Column()
  @Length(1, 255, {
    message: "Last name must be between 1 and 255 characters."
  })
  lastName: string;

  @Column()
  @IsEmail({}, { message: "Email must be a valid email address." })
  @Length(1, 255, { message: "Email must be between 1 and 255 characters." })
  email: string;

  @Column()
  @Length(1, 255, { message: "Username must be between 1 and 255 characters." })
  username: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;

  @Column()
  createdDate: Date;

  @Column()
  loginFailureCount: number = 0;

  @Column({ nullable: true })
  lockoutDate?: Date;

  @Column({ nullable: true })
  lastLogin?: Date;
}
