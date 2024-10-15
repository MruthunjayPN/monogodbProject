import express from "express";
const app = express();
app.use(express.json());
import { routerA } from "./routes/adminRoute.js";
import routerU from "./routes/userRoute.js";

app.use("/admin", routerA);
app.use("/user", routerU);

app.listen(3000);
