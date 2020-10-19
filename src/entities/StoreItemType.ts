import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import StoreItem from "./StoreItem";

@Entity()
export default class StoreItemType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  typeName: string;

  @OneToMany(() => StoreItem, (storeItem) => storeItem.itemName)
  items: StoreItem[];
}
