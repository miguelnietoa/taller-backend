import data from "../utils/data.js";
import { Router } from "express";
import { generateId } from '../utils/utils.js';

const router = Router();


router.get("/", (req, res) => {
  res.status(200).json(data.users);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = data.users.find((user) => user.id == id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

router.post("/", (req, res) => {
  const { username, name } = req.body;
  if (!username || !name) {
    res.status(400).json({ message: "Please provide username and name" });
  } else {

    const newUser = {
      id: generateId(data.users),
      username,
      name,
    };
    data.users.push(newUser);
    res.status(201).json(newUser);
  }
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { username, name } = req.body;
  const user = data.users.find((user) => user.id == id);
  if (user) {
    if (username) {
      user.username = username;
    }
    if (name) {
      user.name = name;
    }
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = data.users.find((user) => user.id == id);
  if (user) {
    const index = data.users.indexOf(user);
    data.users.splice(index, 1);
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});


export default router;
