import data from "../utils/data.js";
import { Router } from "express";
import { generateId } from '../utils/utils.js';

const router = Router();


router.get("/", (req, res) => {
  res.status(200).json(data.players);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const player = data.players.find((player) => player.id == id);
  if (player) {
    res.status(200).json(player);
  } else {
    res.status(404).json({ message: "player not found" });
  }
});

router.post("/", (req, res) => {
  const { name, last_login, password, username } = req.body;
  if (!name || !last_login || !password || !username) {
    res.status(400).json({ message: "Please provide playername and name" });
  } else {
    const newplayer = {
      id: generateId(data.players),
      name,
      last_login,
      password,
      username
    };
    data.players.push(newplayer);
    res.status(201).json(newplayer);
  }
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { name, last_login, password, username } = req.body;
  const player = data.players.find((player) => player.id == id);
  if (player) {
    if (name) {
      player.name = name;
    }
    if (last_login) {
      player.last_login = last_login;
    }
    if (password) {
      player.password = password;
    }
    if (username) {
      player.username = username;
    }
    res.status(200).json(player);
  } else {
    res.status(404).json({ message: "player not found" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const player = data.players.find((player) => player.id == id);
  if (player) {
    const index = data.players.indexOf(player);
    data.players.splice(index, 1);
    res.status(200).json(player);
  } else {
    res.status(404).json({ message: "player not found" });
  }
});


export default router;
