import data from "../utils/data.js";
import { Router } from "express";
import { generateId } from '../utils/utils.js';

const router = Router();


router.get("/", (req, res) => {
  const { show_image } = req.query;
  if (show_image === "true") {
    const items = data.items.map(item => {
      const image = data.images2d.find(image => image.id === item.image);
      return {
        ...item,
        image
      };
    });
    res.status(200).json(items);
  }
  res.status(200).json(data.items);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const { show_image } = req.query;
  const item = data.items.find((user) => user.id == id);
  if (item) {
    if (show_image === "true") {
      const image = data.images2d.find((image) => image.id == item.image);
      res.status(200).json({ ...item, image });
    }
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

router.post("/", (req, res) => {
  const { name, level, description, image, sell_price } = req.body;
  { name, level, description, image, sell_price }
  // Check if some fields are missing from object
  if (!name || !level || !description || !image || !sell_price) {
    res.status(400).json({ message: "Please provide name, level, description, image and sell_price" });
  } else {
    const newItem = {
      id: generateId(data.items),
      name,
      level,
      description,
      image,
      sell_price
    };
    data.items.push(newItem);
    res.status(201).json(newItem);
  }
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { name, level, description, image, sell_price } = req.body;
  const item = data.items.find((item) => item.id == id);
  if (item) {
    if (name) item.name = name;
    if (level) item.level = level;
    if (description) item.description = description;
    if (image) item.image = image;
    if (sell_price) item.sell_price = sell_price;

    res.status(200).json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const item = data.items.find((item) => item.id == id);
  if (item) {
    const index = data.items.indexOf(item);
    data.items.splice(index, 1);
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});


export default router;
