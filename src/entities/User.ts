import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  channelId: number;

  @Column({ type: "int" })
  discordId: number;

  @Column({ type: "int" })
  balance: number;
}
