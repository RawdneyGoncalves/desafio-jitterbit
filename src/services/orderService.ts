import { getRepository } from "typeorm";
import Order from "../models/order";
import Item from "../models/item";

class OrderService {
  static async createOrder(orderData: { numeroPedido: string, valorTotal: number, dataCriacao: string, items: { idItem: string, quantidadeItem: number, valorItem: number }[] }) {
    const orderRepository = getRepository(Order);
    const itemRepository = getRepository(Item);

    const order = orderRepository.create({
      orderNumber: orderData.numeroPedido,
      value: orderData.valorTotal,
      creationDate: new Date(orderData.dataCriacao),
    });
    await orderRepository.save(order);

    if (orderData.items && orderData.items.length > 0) {
      const items = orderData.items.map(itemData => itemRepository.create({
        productId: itemData.idItem,
        quantity: itemData.quantidadeItem,
        price: itemData.valorItem,
        orderId: order.orderId
      }));
      await itemRepository.save(items);
    }

    return order;
  }

  static async getOrder(orderId: string) {
    const orderRepository = getRepository(Order);
    const order = await orderRepository.findOne({ where: { orderId }, relations: ["items"] });
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  }

  static async listOrders() {
    const orderRepository = getRepository(Order);
    const orders = await orderRepository.find({ relations: ["items"] });
    return orders;
  }

  static async updateOrder(orderId: string, updateData: { numeroPedido: string, valorTotal: number, dataCriacao: string, items: { idItem: string, quantidadeItem: number, valorItem: number }[] }) {
    const orderRepository = getRepository(Order);
    const itemRepository = getRepository(Item);

    const order = await orderRepository.findOne({ where: { orderId }, relations: ["items"] });
    if (!order) {
      throw new Error("Order not found");
    }

    Object.assign(order, {
      orderNumber: updateData.numeroPedido,
      value: updateData.valorTotal,
      creationDate: new Date(updateData.dataCriacao)
    });
    await orderRepository.save(order);

    if (updateData.items && updateData.items.length > 0) {
      await itemRepository.delete({ orderId: order.orderId });
      const items = updateData.items.map(itemData => itemRepository.create({
        productId: itemData.idItem,
        quantity: itemData.quantidadeItem,
        price: itemData.valorItem,
        orderId: order.orderId
      }));
      await itemRepository.save(items);
    }

    return order;
  }

  static async deleteOrder(orderId: string) {
    const orderRepository = getRepository(Order);
    const itemRepository = getRepository(Item);

    const order = await orderRepository.findOne({ where: { orderId } });
    if (!order) {
      throw new Error("Order not found");
    }

    await itemRepository.delete({ orderId: order.orderId });
    await orderRepository.remove(order);
  }
}

export default OrderService;