import data from "../utils/data.js";
import { Router } from "express";
import { generateId } from '../utils/utils.js';

const router = Router();

router.get("/", (req, res) => {
  const { show_model } = req.query;
  if (show_model === "true") {
    const val = data.characters.filter(character => character.active)
      .map((character) => {
        const character_stats = data.characterStats.find((stats) => stats.id === character.stats);
        const model = data["models3d"].find((model) =>
          model.id === character.model
        );
        return { ...character, model, character_stats };
      })

    res.status(200).json(val);
  } else {
    const val = data.characters.filter(character => character.active)
      .map((character) => {
        const character_stats = data.characterStats.find((stats) => stats.id === character.stats);
        return { ...character, character_stats };
      });
    res.status(200).json(val);
  }


});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const { show_model } = req.query;
  // true or false
  const character = data.characters.find((character) => character.id === id);
  if (character && character.active) {
    const character_stats = data.characterStats.find((stats) => stats.id === character.stats);
    if (show_model === "true") {
      const model = data["models3d"].find((model) => {
        model.id === character.model
      });
      res.status(200).json({ ...character, model, character_stats });
    } else {
      res.status(200).json(character);
    }

  } else {
    res.status(404).json({ message: "character not found" });
  }
});

router.get("/:id/delivered-missions", (req, res) => {
  const { id } = req.params;
  const character = data.characters.find((character) => character.id === id);
  if (character && character.active) {
    const missions = data.missions.filter((mission) => mission.quest_giver_character === id && mission.active);
    res.status(200).json(missions);
  } else {
    res.status(404).json({ message: "Character not found" });
  }
});

router.get("/:id/suggested-missions", (req, res) => {
  const { id } = req.params;
  const character = data.characters.find((character) => character.id === id);
  if (character && character.active) {
    const missions = data.missions.filter((mission) => mission.level_requirement <= character.level && mission.active);
    res.status(200).json(missions);
  } else {
    res.status(404).json({ message: "Character not found" });
  }
});

router.post("/", (req, res) => {
  const { name, stats, level, title, model } = req.body;
  // Fail if the fields are not completed
  if (!name || !stats || !level || !title || !model) {
    res.status(400).json({ message: "Please provide name, stats, level, title and model" });
  } else {
    const newcharacter = {
      id: generateId(data.characters),
      name,
      stats,
      level,
      title,
      model,
      active: true,
    };
    data.characters.push(newcharacter);
    res.status(201).json(newcharacter);
  }
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { name, stats, level, title, model } = req.body;
  const character = data.characters.find((character) => character.id === id);
  if (character) {
    if (name) {
      character.name = name;
    }
    if (stats) {
      character.stats = stats;
    }
    if (level) {
      character.level = level;
    }
    if (title) {
      character.title = title;
    }
    if (model) {
      character.model = model;
    }
    res.status(200).json(character);
  } else {
    res.status(404).json({ message: "character not found" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const character = data.characters.find((character) => character.id === id);
  if (character && character.active) {
    character.active = false;
    res.status(200).json(character);
  } else {
    res.status(404).json({ message: "character not found" });
  }
});



export default router;
