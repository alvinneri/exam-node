import express, { Application } from "express";
import http from "http";
import cors from "cors";
import router from "./src/routes";

// Setup server
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
app.use(router);

export default server;
