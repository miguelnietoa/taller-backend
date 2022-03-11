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
  const { attribute_1, attribute_2, attribute_3 } = req.body;
  if (!attribute_1 || !attribute_2 || !attribute_3) {
    res.status(400).json({ message: "Please provide attribute_1, attribute_2, attribute_3" });
  } else {
    const newCharacterStat = {
      id: generateId(data.characterStats),
      attribute_1,
      attribute_2,
      attribute_3,
      life: attribute_1 * 20,
      power: attribute_1 * 10 + attribute_2 * 25,
      magic: attribute_3 * 100,
    };
    data.characterStats.push(newCharacterStat);
    res.status(201).json(newCharacterStat);
  }
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { attribute_1, attribute_2, attribute_3 } = req.body;
  const characterStat = data.characterStats.find((characterStat) => characterStat.id == id);
  if (characterStat) {
    if (attribute_1) characterStat.attribute_1 = attribute_1;
    if (attribute_2) characterStat.attribute_2 = attribute_2;
    if (attribute_3) characterStat.attribute_3 = attribute_3;

    characterStat.life = characterStat.attribute_1 * 20;
    characterStat.power = characterStat.attribute_1 * 10 + characterStat.attribute_2 * 25;
    characterStat.magic = characterStat.attribute_3 * 100;
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
