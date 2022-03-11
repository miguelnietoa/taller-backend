import data from "../utils/data.js";
import { Router } from "express";
import { generateId } from '../utils/utils.js';

const router = Router();

router.get("/", (req, res) => {
  const { show_model } = req.query;
  if (show_model === "true") {
    const playerCharacters = data.playerCharacters.map(playerCharacter => {
      const model = data.models3d.find(model => model.id === playerCharacter.model);
      return {
        ...playerCharacter,
        model
      };
    });
    res.status(200).json(playerCharacters);
  }
  res.status(200).json(data.playerCharacters);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const { show_model } = req.query;
  const playerCharacter = data.playerCharacters.find((playerCharacter) => playerCharacter.id == id);
  if (playerCharacter) {
    if (show_model === "true") {
      const model = data.models3d.find((model) => model.id == playerCharacter.model);
      res.status(200).json({ ...playerCharacter, model });
    }
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
  const { name, stats, level, title, model } = req.body;
  const playerCharacter = data.playerCharacters.find((playerCharacter) => playerCharacter.id == id);
  if (playerCharacter) {
    if (name) playerCharacter.name = name;
    if (stats) playerCharacter.stats = stats;
    if (level) playerCharacter.level = level;
    if (title) playerCharacter.title = title;
    if (model) playerCharacter.model = model;

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
