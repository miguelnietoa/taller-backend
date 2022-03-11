import data from "../utils/data.js";
import { Router } from "express";
import { generateId } from '../utils/utils.js';

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json(data.missionsObjetives);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const missionsObjective = data.missionsObjetives.find((missionsObjective) => missionsObjective.id == id);
  if (missionsObjective) {
    res.status(200).json(missionsObjective);
  } else {
    res.status(404).json({ message: "Missions objective not found" });
  }
});

router.post("/", (req, res) => {
  const { name, description, count, mission } = req.body;
  if (!name || !description || !count || !mission) {
    res.status(400).json({ message: "Please provide name, description, count and mission" });
  } else {
    const newMissionsObjective = {
      id: generateId(data.missionsObjetives),
      name,
      description,
      count,
      mission
    };
    data.missionsObjetives.push(newMissionsObjective);
    res.status(201).json(newMissionsObjective);
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const missionsObjective = data.missionsObjectives.find((missionsObjective) => missionsObjective.id == id);
  if (missionsObjective) {
    const index = data.purchases.indexOf(missionsObjective);
    data.missionsObjetives.splice(index, 1);
    res.status(200).json(missionsObjective);
  } else {
    res.status(404).json({ message: "Mission objective not found" });
  }
});


export default router;
