import { Exclude } from "class-transformer";
import { BaseEntity, Column } from "typeorm";

export default class MyBaseEntity extends BaseEntity {
  @Column({ nullable: true })
  @Exclude()
  createdBy: number;

  @Column({ nullable: true })
  @Exclude()
  updatedAt: Date;

  @Column({ nullable: true })
  @Exclude()
  createdAt: Date;
}
