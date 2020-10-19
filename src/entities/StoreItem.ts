import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import StoreItemType from "./StoreItemType";

@Entity()
export default class StoreItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  itemName: string;

  @Column({ type: "int" })
  itemPrice: number;

  @ManyToOne(() => StoreItemType, (storeItemType) => storeItemType.typeName)
  itemType: StoreItemType;
}
