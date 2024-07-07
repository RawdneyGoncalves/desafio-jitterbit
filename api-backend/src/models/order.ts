import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Item from "./item";

@Entity()
class Order {
  @PrimaryGeneratedColumn("uuid")
  orderId!: string;
  orderNumber: string | undefined;

  @Column()
  value!: number;

  @Column()
  creationDate!: Date;

  @OneToMany(() => Item, item => item.order, { cascade: true })
  items!: Item[];
}

export default Order;
