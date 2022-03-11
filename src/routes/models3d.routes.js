import data from "../utils/data.js";
import { Router } from "express";
import { generateId } from '../utils/utils.js';

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json(data.models3d.filter((model_3d) => model_3d.active));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const model_3d = data.models3d.find((model_3d) => model_3d.id === id);
  if (model_3d && model_3d.active) {
    res.status(200).json(model_3d);
  } else {
    res.status(404).json({ message: "model3d not found" });
  }
});

router.post("/", (req, res) => {
  const { address } = req.body;
  if (!address) {
    res.status(400).json({ message: "Please provide a address" });
  } else {
    const newmodel_3d = {
      id: generateId(data.models3d),
      address,
      active: true,
    };
    data.models3d.push(newmodel_3d);
    res.status(201).json(newmodel_3d);
  }
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { address} = req.body;
  const model_3d = data.models3d.find((model_3d) => model_3d.id === id);
  if (model_3d && model_3d.active) {
    if (address) {
      model_3d.address = address;
    }
    res.status(200).json(model_3d);
  } else {
    res.status(404).json({ message: "model_3d not found" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const model_3d = data.models3d.find((model_3d) => model_3d.id === id);
  if (model_3d && model_3d.active) {
    model_3d.active = false;
    res.status(200).json(model_3d);
  } else {
    res.status(404).json({ message: "model_3d not found" });
  }
});


export default router;
