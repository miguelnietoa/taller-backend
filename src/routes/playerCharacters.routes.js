import data from "../utils/data.js";
import { Router } from "express";
import { generateId } from '../utils/utils.js';

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json(data.playerCharacters);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const playerCharacter = data.playerCharacters.find((playerCharacter) => playerCharacter.id == id);
  if (playerCharacter) {
    res.status(200).json(playerCharacter);
  } else {
    res.status(404).json({ message: "playerCharacter not found" });
  }
});

router.post("/", (req, res) => {
  const { name, stats, level, title, model, player } = req.body;
  // Fail if the fields are not completed
  if (!name || !stats || !level || !title || !model || !player) {
    res.status(400).json({ message: "Please provide name, stats, level, title, model and player" });
  } else {
    const newPlayerCharacter = {
      id: generateId(data.playerCharacters),
      name, stats, level, title, model, player
    };
    data.playerCharacters.push(newPlayerCharacter);
    res.status(201).json(newPlayerCharacter);
  }
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { name, stats, level, title, model, player } = req.body;
  const playerCharacter = data.playerCharacters.find((playerCharacter) => playerCharacter.id == id);
  if (playerCharacter) {
    if (name) playerCharacter.name = name;
    if (stats) playerCharacter.stats = stats;
    if (level) playerCharacter.level = level;
    if (title) playerCharacter.title = title;
    if (model) playerCharacter.model = model;
    if (player) playerCharacter.player = player;

    res.status(200).json(playerCharacter);
  } else {
    res.status(404).json({ message: "playerCharacter not found" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const playerCharacter = data.playerCharacters.find((playerCharacter) => playerCharacter.id == id);
  if (playerCharacter) {
    const index = data.playerCharacters.indexOf(playerCharacter);
    data.playerCharacters.splice(index, 1);
    res.status(200).json(playerCharacter);
  } else {
    res.status(404).json({ message: "playerCharacter not found" });
  }
});



export default router;
