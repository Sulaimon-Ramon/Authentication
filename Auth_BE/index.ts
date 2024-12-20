import express, { Application } from "express";
import env from "dotenv";
import { db } from "./config/db";
import route from "./Router/authRouter";
// import cors from "cors";

env.config();

const app:Application = express();


app.use(express.json());

// app.use(cors())

app.use("/api/v1", route);



const server = app.listen(process.env.PORT || 2006, () => {  
   console.log(`Server is running on port ${process.env.PORT || 2006}`);
   db();  
});
