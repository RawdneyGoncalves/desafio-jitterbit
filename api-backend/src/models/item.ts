import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Order from "./order";

@Entity()
class Item {
  @PrimaryGeneratedColumn("uuid")
  itemId!: string;

  @Column()
  productId!: string;

  @Column()
  quantity!: number;

  @Column()
  price!: number;

  @ManyToOne(() => Order, order => order.items)
  order!: Order;
}

export default Item;