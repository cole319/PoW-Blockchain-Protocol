const express = require("express");
const bodyParser = require("body-parser");

const PubSub = require("./pubsub");
const Blockchain = require("./Blockchain");

const blockChain = new Blockchain();

const app = express();

const pubsub = new PubSub({ blockChain });

const DEFAULT_PORT = 3000;
let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === "true") {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}
const PORT = PEER_PORT || DEFAULT_PORT;

setTimeout(() => pubsub.broadcastChainData(), 1000);

app.use(bodyParser.json());

app.get("/api/chain", (req, res) => {
  res.json(blockChain.chain);
});

app.post("/api/mine", (req, res) => {
  const { data } = req.body;

  blockChain.addBlock({ data });
  pubsub.broadcastChainData();
  res.redirect("/api/blocks");
});

app.listen(PORT, () => {
  console.log(`Listening to PORT:${PORT}`);
});
