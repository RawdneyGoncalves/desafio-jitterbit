import { getRepository } from "typeorm";
import Order from "../models/order";
import Item from "../models/item";

class OrderService {
  static async createOrder(orderData: { numeroPedido: string, valorTotal: number, dataCriacao: string, items: { idItem: string, quantidadeItem: number, valorItem: number }[] }) {
    const orderRepository = getRepository(Order);
    const itemRepository = getRepository(Item);

    // Cria o pedido
    const order = new Order();
    order.orderNumber = orderData.numeroPedido;
    order.value = orderData.valorTotal;
    order.creationDate = new Date(orderData.dataCriacao);

    await orderRepository.save(order);

    // Cria os itens associados ao pedido, se houver
    if (orderData.items && orderData.items.length > 0) {
      const items = orderData.items.map(itemData => {
        const item = new Item();
        item.productId = itemData.idItem;
        item.quantity = itemData.quantidadeItem;
        item.price = itemData.valorItem;
        item.order = order;
        return item;
      });

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

    // Busca o pedido pelo orderId
    const order = await orderRepository.findOne({ where: { orderId }, relations: ["items"] });
    if (!order) {
      throw new Error("Order not found");
    }

    // Atualiza os dados do pedido
    order.orderNumber = updateData.numeroPedido;
    order.value = updateData.valorTotal;
    order.creationDate = new Date(updateData.dataCriacao);

    await orderRepository.save(order);

    // Deleta os itens existentes associados ao pedido e cria novos itens, se houver
    if (updateData.items && updateData.items.length > 0) {
      await itemRepository.delete({ order: order });

      const items = updateData.items.map(itemData => {
        const item = new Item();
        item.productId = itemData.idItem;
        item.quantity = itemData.quantidadeItem;
        item.price = itemData.valorItem;
        item.order = order;
        return item;
      });

      await itemRepository.save(items);
    }

    return order;
  }

  static async deleteOrder(orderId: string) {
    const orderRepository = getRepository(Order);
    const itemRepository = getRepository(Item);

    // Busca o pedido pelo orderId
    const order = await orderRepository.findOne({ where: { orderId } });
    if (!order) {
      throw new Error("Order not found");
    }

    // Deleta os itens associados ao pedido e em seguida o pedido
    await itemRepository.delete({ order: order });
    await orderRepository.remove(order);
  }
}

export default OrderService;
