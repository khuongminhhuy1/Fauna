import "dotenv/config.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createCategory(req, res) {
  const { name, total } = req.body;
  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
        total,
      },
    });
    res
      .status(200)
      .send("New Category has been successfully created", newCategory);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function updateCategory(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        name,
      },
    });
    res.status(201).send("Updated Category");
  } catch (error) {}
}

export async function deleteCategory(req, res) {
  const { id } = req.params;
  try {
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });
    res.status(201).send("Category Deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function showCategory(req, res) {
  try {
    const category = await prisma.category.findMany();
    if (!category) {
      res.status(404).send("Category not found");
    } else {
      res.json(category);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function showSingleCategory(req, res) {
  const { id } = req.params;
  try {
    const category = await prisma.category.findFirst({
      where: { id: parseInt(id) },
    });
    if (!category) {
      res.status(404).send("Category not found");
    } else {
      res.json(category);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
