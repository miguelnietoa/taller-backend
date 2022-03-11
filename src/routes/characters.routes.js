import data from "../utils/data.js";
import { Router } from "express";
import { generateId } from '../utils/utils.js';

const router = Router();

router.get("/", (req, res) => {
  const { show_model } = req.query;
  if (show_model === "true") {
    const val = data.characters.map((character) => {
      const model = data["models3d"].find((model) =>
        model.id === character.model
      );
      return { ...character, model };
    })

    res.status(200).json(val);
  } else {
    res.status(200).json(data.characters);
  }


});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const { show_model } = req.query;
  // true or false
  const character = data.characters.find((character) => character.id == id);
  if (character) {
    if (show_model === "true") {
      const model = data["models3d"].find((model) => {
        model.id === character.model
      });
      res.status(200).json({...character,model});
    } else {
      res.status(200).json(character);
    }

  } else {
    res.status(404).json({ message: "character not found" });
  }
});

router.get("/:id/missions", (req, res) => {
  const { id } = req.params;
  const character = data.characters.find((character) => character.id === id);
  if (character) {
    const missions = data.missions.filter((mission) => mission.quest_giver_character === id);
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
      name, stats, level, title, model
    };
    data.characters.push(newcharacter);
    res.status(201).json(newcharacter);
  }
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { name, stats, level, title, model } = req.body;
  const character = data.characters.find((character) => character.id == id);
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
  const character = data.characters.find((character) => character.id == id);
  if (character) {
    const index = data.characters.indexOf(character);
    data.characters.splice(index, 1);
    res.status(200).json(character);
  } else {
    res.status(404).json({ message: "character not found" });
  }
});



export default router;
