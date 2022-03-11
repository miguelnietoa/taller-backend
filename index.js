import express from "express";
const app = express();

import itemsRoute from "./src/routes/items.routes.js";
import playerCharactersRoute from "./src/routes/playerCharacters.routes.js";
import characterStatsRoute from "./src/routes/characterStats.routes.js";

const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/items', itemsRoute);
app.use('/player-characters', playerCharactersRoute);
app.use('/character-stats', characterStatsRoute);

app.listen(port);
