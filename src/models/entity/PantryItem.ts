import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import Item from "./Item";
import MyBaseEntity from "./MyBaseEntity";
import { Pantry } from "./Pantry";

@Entity({ name: "pantry_item" })
export default class PantryItem extends MyBaseEntity {
  @PrimaryColumn({ type: "int" })
  itemId: number;

  @PrimaryColumn({ type: "int" })
  pantryId: number;

  @ManyToOne(() => Item, item => item.pantryItems)
  item: Item;

  @ManyToOne(() => Pantry, pantry => pantry.pantryItems)
  pantry: Pantry;
}
