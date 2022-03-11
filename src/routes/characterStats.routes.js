import data from "../utils/data.js";
import { Router } from "express";
import { generateId } from '../utils/utils.js';

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json(data.characterStats);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const characterStat = data.characterStats.find((purchase) => purchase.id == id);
  if (characterStat) {
    res.status(200).json(characterStat);
  } else {
    res.status(404).json({ message: "Character Stat not found" });
  }
});

router.post("/", (req, res) => {
  const { life, power, magic, attribute_1, attribute_2, attribute_3 } = req.body;
  if (!life || !power || !magic || !attribute_1 || !attribute_2 || !attribute_3) {
    res.status(400).json({ message: "Please provide life, power, magic, attribute_1, attribute_2, attribute_3" });
  } else {
    const newCharacterStat = {
      id: generateId(data.characterStats),
      life, power, magic, attribute_1, attribute_2, attribute_3
    };
    data.characterStats.push(newCharacterStat);
    res.status(201).json(newCharacterStat);
  }
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { life, power, magic, attribute_1, attribute_2, attribute_3 } = req.body;
  const characterStat = data.characterStats.find((characterStat) => characterStat.id == id);
  if (characterStat) {
    if (life) characterStat.life = life;
    if (power) characterStat.power = power;
    if (magic) characterStat.magic = magic;
    if (attribute_1) characterStat.attribute_1 = attribute_1;
    if (attribute_2) characterStat.attribute_2 = attribute_2;
    if (attribute_3) characterStat.attribute_3 = attribute_3;

    res.status(200).json(characterStat);
  } else {
    res.status(404).json({ message: "Character Stat not found" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const characterStat = data.characterStats.find((characterStat) => characterStat.id == id);
  if (characterStat) {
    const index = data.characterStats.indexOf(characterStat);
    data.characterStats.splice(index, 1);
    res.status(200).json(characterStat);
  } else {
    res.status(404).json({ message: "Character Stat not found" });
  }
});


export default router;
