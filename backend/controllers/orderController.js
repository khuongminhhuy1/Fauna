import "dotenv/config.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createOrder(req, res) {
  const { userId, items, totalAmount } = req.body;

  if (!userId || !items || items.length === 0) {
    return res.status(400).json({ message: "Invalid order data" });
  }

  try {
    const order = await prisma.orders.create({
      data: {
        userId,
        orderNumber: `ORD-${Date.now()}`,
        totalAmount,
        orderItems: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });
    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
}

export async function getUserOrders(req, res) {
  const { userId } = req.params;

  try {
    const orders = await prisma.orders.findMany({
      where: { userId: parseInt(userId) },
      include: { orderItems: true },
    });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
}
