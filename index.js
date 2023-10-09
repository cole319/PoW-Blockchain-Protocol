const express = require("express");
const bodyParser = require("body-parser");

const Blockchain = require("./Blockchain");
const PORT = 3000;

const blockChain = new Blockchain();

const app = express();

app.use(bodyParser.json());

app.get("/api/chain", (req, res) => {
  res.json(blockChain.chain);
});

app.post("/api/mine", (req, res) => {
  const { data } = req.body;

  blockchain.addBlock({ data });
  //   pubsub.broadcastChain();
  res.redirect("/api/blocks");
});

app.listen(PORT, () => {
  console.log(`Listening to PORT:${PORT}`);
});
