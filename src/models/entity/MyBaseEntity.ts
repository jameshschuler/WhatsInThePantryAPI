import { Exclude } from "class-transformer";
import { BaseEntity, Column } from "typeorm";

export default class MyBaseEntity extends BaseEntity {
  @Column({ nullable: true })
  @Exclude()
  createdBy: number;

  @Column({ default: new Date() })
  @Exclude()
  updatedAt: Date;

  @Column({ default: new Date() })
  @Exclude()
  createdAt: Date;
}
