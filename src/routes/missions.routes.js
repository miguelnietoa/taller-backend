import data from "../utils/data.js";
import { Router } from "express";
import { generateId } from '../utils/utils.js';

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json(data.missions);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const mission = data.missions.find((mission) => mission.id == id);
  if (mission) {
    res.status(200).json(mission);
  } else {
    res.status(404).json({ message: "Mission not found" });
  }
});

router.post("/", (req, res) => {
  const { name, description, level_reward, level_requirement, quest_giver_character } = req.body;
  // Fail if the fields are not completed
  if (!name || !description || !level_reward || !level_requirement || ! quest_giver_character) {
    res.status(400).json({ message: "Please provide name, description, level reward, level requirement and quest giver character" });
  } else {
    const newMission = {
      id: generateId(data.missions),
      name,
      description,
      level_reward, 
      level_requirement,
      quest_giver_character,
    };
    data.missions.push(newMission);
    res.status(201).json(newMission);
  }
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, level_reward, level_requirement, quest_giver_character } = req.body;
  const mission = data.missions.find((mission) => mission.id == id);
  if (mission) {
    if (name) {
      mission.name = name;
    }
    if (description) {
      mission.description = description;
    }
    if (level_reward) {
      mission.level_reward = level_reward;
    }
    if (level_requirement) {
      mission.level_requirement = level_requirement;
    }
    if (quest_giver_character) {
      mission.quest_giver_character = quest_giver_character;
    }
    res.status(200).json(mission);
  } else {
    res.status(404).json({ message: "Mission not found" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const mission = data.missions.find((mission) => mission.id == id);
  if (mission) {
    const index = data.missions.indexOf(mission);
    data.missions.splice(index, 1);
    res.status(200).json(mission);
  } else {
    res.status(404).json({ message: "Mission not found" });
  }
});



export default router;
