import { PrismaClient } from "@prisma/client";
import multer from "multer";
import { upload } from "../utils/fileUpload.js";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

export async function createProduct(req, res) {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    // Destructure product details from request body
    const { name, categoryId, price, description } = req.body;

    // Assuming you want to save the file URLs in your database (example with images)
    const imageUrls = req.files.map((file) => file.path); // This is Cloudinary URL (accessible via 'file.path')

    // Create the product in the database
    const categoryIdInt = parseInt(categoryId);
    const priceFloat = parseFloat(price);
    const newProduct = await prisma.product.create({
      data: {
        name,
        categoryId: categoryIdInt,
        price: priceFloat,
        description,
        images: {
          create: imageUrls.map((url) => ({ url })),
        },
      },
    });
    await prisma.category.update({
      where: { id: categoryIdInt },
      data: {
        total: {
          increment: 1, // Increment the total count by 1
        },
      },
    });
    // Respond with the created product
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send(error.message);
  }
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, categoryId, price, description } = req.body;
}

export async function deleteProduct(req, res) {
  try {
    const id = parseInt(req.params.id); // Get the product ID from the URL parameters

    // Find the product's categoryId and related images before deleting
    const product = await prisma.product.findUnique({
      where: { id: id },
      select: {
        categoryId: true,
        images: true, // Get the related images
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete all the images related to the product
    await prisma.image.deleteMany({
      where: {
        productId: id, // Delete images associated with this product
      },
    });

    // Delete the product itself
    await prisma.product.delete({
      where: { id: id },
    });

    // Fetch the current total count for the category
    const category = await prisma.category.findUnique({
      where: { id: product.categoryId },
      select: { total: true },
    });

    if (category.total > 0) {
      // Update the total count for the category only if it's greater than 0
      await prisma.category.update({
        where: { id: product.categoryId },
        data: {
          total: {
            decrement: 1, // Decrement the total count by 1
          },
        },
      });
    }

    res
      .status(200)
      .json({ message: "Product and related images deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: error.message });
  }
}
export async function getAllProduct(req, res) {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    if (product) {
      res.json(product);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
export const getProductByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = await prisma.product.findMany({
      where: { categoryId: parseInt(categoryId) },
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Error fetching products." });
  }
};
