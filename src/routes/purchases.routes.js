import data from "../utils/data.js";
import { Router } from "express";
import { generateId } from '../utils/utils.js';

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json(data.purchases);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const purchase = data.purchases.find((purchase) => purchase.id == id);
  if (purchase) {
    res.status(200).json(purchase);
  } else {
    res.status(404).json({ message: "Purchase not found" });
  }
});

router.post("/", (req, res) => {
  const { userId, productId } = req.body;
  if (!userId || !productId) {
    res.status(400).json({ message: "Please provide userId and productId" });
  } else {
    const newPurchase = {
      id: generateId(data.purchases),
      userId,
      productId,
    };
    data.purchases.push(newPurchase);
    res.status(201).json(newPurchase);
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const purchase = data.purchases.find((purchase) => purchase.id == id);
  if (purchase) {
    const index = data.purchases.indexOf(purchase);
    data.purchases.splice(index, 1);
    res.status(200).json(purchase);
  } else {
    res.status(404).json({ message: "Purchase not found" });
  }
});


export default router;
