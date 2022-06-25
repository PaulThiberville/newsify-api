const http = require("http");
const PORT = 5000;
const express = require("express");
const app = express();
const cors = require("cors");
const controller = require("./controller");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/favico.ico", (req, res) => {
  res.sendStatus(404);
});
app.get("/les_echos/:query", controller.lesEchos);
app.get("/l_humanite/:query", controller.lHumanite);
app.get("/liberation/:query", controller.liberation);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on : http://localhost:${PORT}`);
});
