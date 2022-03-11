import express from "express";
const app = express();

import itemsRoute from "./src/routes/items.routes.js";
import playerCharactersRoute from "./src/routes/playerCharacters.routes.js";
import characterStatsRoute from "./src/routes/characterStats.routes.js";

import missionsRoute from "./src/routes/missions.routes.js";
import missionObjectivesRoute from "./src/routes/missionObjectives.routes.js";
import images2dRoute from "./src/routes/images2d.routes.js";

import models3dRoute from "./src/routes/models3d.routes.js";
import charactersRoute from "./src/routes/characters.routes.js";
import playersRoute from "./src/routes/players.routes.js";

const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/items', itemsRoute);
app.use('/player-characters', playerCharactersRoute);
app.use('/character-stats', characterStatsRoute);

app.use('/missions', missionsRoute);
app.use('/mission-objectives', missionObjectivesRoute);
app.use('/images-2d', images2dRoute);

app.use('/models-3d', models3dRoute);
app.use('/characters', charactersRoute);
app.use('/players', playersRoute);


app.listen(port);
