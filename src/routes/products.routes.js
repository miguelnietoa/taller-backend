import data from "../utils/data.js";
import { Router } from "express";
import { generateId } from '../utils/utils.js';

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json(data.products);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = data.products.find((product) => product.id == id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

router.post("/", (req, res) => {
  const { name, price } = req.body;
  // Fail if the fields are not completed
  if (!name || !price) {
    res.status(400).json({ message: "Please provide name and price" });
  } else {
    const newProduct = {
      id: generateId(data.products),
      name,
      price,
    };
    data.products.push(newProduct);
    res.status(201).json(newProduct);
  }
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const product = data.products.find((product) => product.id == id);
  if (product) {
    if (name) {
      product.name = name;
    }
    if (price) {
      product.price = price;
    }
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const product = data.products.find((product) => product.id == id);
  if (product) {
    const index = data.products.indexOf(product);
    data.products.splice(index, 1);
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});



export default router;
