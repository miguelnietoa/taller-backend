import data from "../utils/data.js";
import { Router } from "express";
import { generateId } from '../utils/utils.js';

const router = Router();


router.get("/", (req, res) => {
  res.status(200).json(
    data.images2d.filter(image => image.active)
  );
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const image2d = data.images2d.find((image2d) => image2d.id === id);
  if (image2d && image2d.active) {
    res.status(200).json(image2d);
  } else {
    res.status(404).json({ message: "Image 2D not found" });
  }
});

router.post("/", (req, res) => {
  const { address } = req.body;
  if (!address) {
    res.status(400).json({ message: "Please provide an address" });
  } else {

    const newImage2d = {
      id: generateId(data.images2d),
      address,
      active: true,
    };
    data.images2d.push(newImage2d);
    res.status(201).json(newImage2d);
  }
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { address } = req.body;
  const image2d = data.images2d.find((image2d) => image2d.id === id);
  if (image2d && image2d.active) {
    if (address) {
      image2d.address = address;
    }
    res.status(200).json(image2d);
  } else {
    res.status(404).json({ message: "Image 2D not found" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const image2d = data.images2d.find((image2d) => image2d.id === id);
  if (image2d && image2d.active) {
    image2d.active = false;
    res.status(200).json(image2d);
  } else {
    res.status(404).json({ message: "Image 2D not found" });
  }
});


export default router;
