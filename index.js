import express from "express";
const app = express();


import usersRoute from "./src/routes/users.routes.js";
import productsRoute from "./src/routes/products.routes.js";
import purchasesRoute from "./src/routes/purchases.routes.js";

const port = process.env.PORT || 8080;

app.use(express.json());



app.use('/users', usersRoute);
app.use('/products', productsRoute);
app.use('/purchases', purchasesRoute);


app.listen(port);
