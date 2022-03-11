import express from "express";
const app = express();

import itemsRoute from "./src/routes/items.routes.js";
import playerCharactersRoute from "./src/routes/playerCharacters.routes.js";
import characterStatsRoute from "./src/routes/characterStats.routes.js";

import missionsRoute from "./src/routes/missions.routes.js";
import missionsObjectivesRoute from "./src/routes/missionsObjectives.routes.js";
import images2dRoute from "./src/routes/images2d.routes.js";

const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/items', itemsRoute);
app.use('/player-characters', playerCharactersRoute);
app.use('/character-stats', characterStatsRoute);


app.use('/missions', missionsRoute);
app.use('/missions-objectives', missionsObjectivesRoute);
app.use('/images-2d', images2dRoute);


app.listen(port);
