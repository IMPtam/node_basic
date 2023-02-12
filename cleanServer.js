const http = require("http");
const express = require("express");
const chalk = require("chalk");
const fs = require("fs/promises");
const path = require("path");
const { addNotes } = require("./note.conrollers");

const port = 3000;
const basePath = path.join(__dirname, "pages");
const app = express();

const server = http.createServer(async (req, res) => {
  // console.log("Ответ клиента метод", req.method);
  // console.log("Ответ клиента url", req.url);
  // res.end("Привет от сервера!");
  if (req.method === "GET") {
    const content = await fs.readFile(path.join(basePath, "index.html"));
    // res.setHeader("Content-Type", "text/html");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
  } else if (req.method === "POST") {
    const body = [];
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    req.on("data", (data) => {
      body.push(Buffer.from(data));
      // console.log("data=", data);
    });
    req.on("end", () => {
      // console.log("End", body.toString().split("=")[1].replaceAll("+", " "));
      const title = body.toString().split("=")[1].replaceAll("+", " ");
      addNotes(title);
    });

    res.end("Notes created!");
  }
});

server.listen(port, () => {
  console.log(chalk.blueBright(`Сервер запустился на порту ${port}....`));
});
