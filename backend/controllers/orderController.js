import "dotenv/config.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function Checkout(req, res) {
  const { userId, addressId, paymentMethod } = req.body;

  try {
    // Fetch the user and cart
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { Cart: { include: { Product: true } } },
    });

    if (!user || user.Cart.length === 0) {
      return res
        .status(400)
        .json({ error: "Cart is empty or user not found." });
    }

    // Fetch the address from UserInformation
    const address = await prisma.userInformation.findUnique({
      where: { id: addressId },
    });

    if (!address || address.userId !== userId) {
      return res.status(400).json({ error: "Invalid address." });
    }

    // Calculate the total amount
    const totalAmount = user.Cart.reduce(
      (sum, item) => sum + item.Product.price * item.quantity,
      0
    );

    // Generate a unique order number
    const orderNumber = `ORDER-${Date.now()}-${userId}`;

    // Create the order and associated order items
    const order = await prisma.orders.create({
      data: {
        userId,
        orderNumber,
        totalAmount,
        paymentMethod,
        status: "PENDING",
        orderItems: {
          create: user.Cart.map((cartItem) => ({
            productId: cartItem.productId,
            quantity: cartItem.quantity,
            price: cartItem.Product.price,
          })),
        },
      },
    });

    // Clear the user's cart
    await prisma.cart.deleteMany({ where: { userId } });

    return res.status(201).json({
      message: "Order placed successfully.",
      order,
      shippingAddress: address,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return res
      .status(500)
      .json({ error: "An error occurred during checkout." });
  }
}
export async function GetOrders(req, res) {

  try {
    const orders = await prisma.orders.findMany({
      include: { orderItems: { include: { Product: true } } },
    });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("GetOrders error:", error);
    return res.status(500).json({ error: "An error occurred." });
  }
}