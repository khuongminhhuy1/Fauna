import { PrismaClient } from "@prisma/client";
import multer from "multer";
import upload from "../utils/fileUpload.js";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

export async function createProduct(req, res) {
  try {
    // Handle file upload using multer
    upload(req, res, async (err) => {
      // Handle multer errors
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Destructure product details from request body
      const { name, categoryId, price, description } = req.body;

      // Upload file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "uploads",
      });

      // Create the product in the database
      const categoryIdInt = parseInt(categoryId);
      const priceFloat = parseFloat(price);
      const newProduct = await prisma.product.create({
        data: {
          name,
          categoryId: categoryIdInt,
          price: priceFloat,
          description,
          image: result.secure_url, // Save the Cloudinary image URL
        },
      });

      // Update the total count for the category
      await prisma.category.update({
        where: { id: categoryIdInt },
        data: {
          total: {
            increment: 1, // Increment the total count by 1
          },
        },
      });

      // Respond with success message
      res.status(200).json(newProduct);
    });
  } catch (error) {
    // Handle errors
    console.error("Error creating product:", error);
    res.status(500).send(error.message);
  }
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, categoryId, price, description } = req.body;
}

export async function deleteProduct(req, res) {
  const id = req.params;
  // Find the product's categoryId before deleting
  const product = await prisma.product.findUnique({
    where: { id: id },
    select: { categoryId: true },
  });
  if (!product) {
    throw new Error("Product not found");
  }

  // Delete the product
  await prisma.product.delete({
    where: { id: id },
  });
  res.status(201).send("Product Deleted");
  // Update the total count for the category
  await prisma.category.update({
    where: { id: product.categoryId },
    data: {
      total: {
        decrement: 1, // Decrement the total count by 1
      },
    },
  });
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
