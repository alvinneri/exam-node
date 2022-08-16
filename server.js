const express = require("express");
const http = require("http");
const cors = require("cors");
const router = require("./src/routes");

// Setup server
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
app.use(router);

module.exports = server;
