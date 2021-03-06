import data from "../utils/data.js";
import { Router } from "express";
import { generateId } from '../utils/utils.js';

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json(data.missionObjectives.filter(missionObjective => missionObjective.active));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const missionObjective = data.missionObjectives.find((missionObjective) => missionObjective.id === id);
  if (missionObjective && missionObjective.active) {
    res.status(200).json(missionObjective);
  } else {
    res.status(404).json({ message: "Mission objective not found" });
  }
});

router.post("/", (req, res) => {
  const { name, description, count, mission } = req.body;
  if (!name || !description || !count || !mission) {
    res.status(400).json({ message: "Please provide name, description, count and mission" });
  } else {
    const newMissionObjective = {
      id: generateId(data.missionObjectives),
      name,
      description,
      count,
      mission,
      active: true,
    };
    data.missionObjectives.push(newMissionObjective);
    res.status(201).json(newMissionObjective);
  }
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, count } = req.body;
  const missionObjective = data.missionObjectives.find((missionObjective) => missionObjective.id === id);
  if (missionObjective && missionObjective.active) {
    if (name) {
      missionObjective.name = name;
    }
    if (description) {
      missionObjective.description = description;
    }
    if (count) {
      missionObjective.count = count;
    }
    res.status(200).json(missionObjective);
  } else {
    res.status(404).json({ message: "Mission objective not found" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const missionObjective = data.missionObjectives.find((missionObjective) => missionObjective.id === id);
  if (missionObjective && missionObjective.active) {
    missionObjective.active = false;
    res.status(200).json(missionObjective);
  } else {
    res.status(404).json({ message: "Mission objective not found" });
  }
});


export default router;
