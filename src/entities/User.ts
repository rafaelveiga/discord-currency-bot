import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  guild: string;

  @Column({ type: "varchar" })
  discordId: string;

  @Column({ type: "int" })
  balance: number;
}
