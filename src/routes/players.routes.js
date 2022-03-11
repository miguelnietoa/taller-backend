import data from "../utils/data.js";
import { Router } from "express";
import { generateId } from '../utils/utils.js';

const router = Router();


router.get("/", (req, res) => {
  res.status(200).json(data.players.filter(player => player.active));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const player = data.players.find((player) => player.id === id);
  if (player && player.active) {
    res.status(200).json(player);
  } else {
    res.status(404).json({ message: "player not found" });
  }
});

router.get("/:id/characters", (req, res) => {
  const { id } = req.params;
  const player = data.players.find((player) => player.id === id);
  if (player && player.active) {
    const characters = data.playerCharacters.filter((playerCharacter) => playerCharacter.player === id && playerCharacter.active);
    res.status(200).json(characters);
  } else {
    res.status(404).json({ message: "Player not found" });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const player = data.players.find((player) => player.username === username && player.password === password);
  if (player && player.active) {
    player.last_login = new Date();
    res.status(200).json({ logged: true });
  } else {
    res.status(404).json({ message: "Invalid credentials" });
  }
});

router.post("/", (req, res) => {
  const { name, password, username } = req.body;
  if (!name || !password || !username) {
    res.status(400).json({ message: "Please provide playername and name" });
  } else {
    const newplayer = {
      id: generateId(data.players),
      name,
      last_login: new Date(),
      password,
      username,
      active: true,
    };
    data.players.push(newplayer);
    res.status(201).json(newplayer);
  }
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { name, last_login, password, username } = req.body;
  const player = data.players.find((player) => player.id === id);
  if (player && player.active) {
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
  const player = data.players.find((player) => player.id === id);
  if (player && player.active) {
    player.active = false;
    res.status(200).json(player);
  } else {
    res.status(404).json({ message: "player not found" });
  }
});


export default router;
