import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import MyBaseEntity from "./MyBaseEntity";
import { Pantry } from "./Pantry";
import User from "./User";

@Entity({ name: "pantry_user" })
export default class PantryUser extends MyBaseEntity {
  @PrimaryColumn({ type: "int" })
  userId: number;

  @PrimaryColumn({ type: "int" })
  pantryId: number;

  @Column({ nullable: false })
  isOwner: boolean;

  @Column({ nullable: false })
  canRead: boolean;

  @Column({ nullable: false })
  canWrite: boolean;

  @ManyToOne(() => User, user => user.pantryUsers)
  user: User;

  @ManyToOne(() => Pantry, pantry => pantry.pantryUsers)
  pantry: Pantry;
}
