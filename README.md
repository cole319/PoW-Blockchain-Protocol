# 🧱 Node.js Proof of Work Blockchain

A robust and efficient Proof of Work blockchain protocol built entirely with **Node.js**. This project demonstrates a full-fledged implementation of essential blockchain concepts and serves as a foundational model for learning, experimentation, and further development.

## 🚀 Features

- ⛏️ **Block Mining** — Mine new blocks using a dynamic Proof of Work algorithm.
- 🧠 **Consensus Mechanism** — Maintain the longest valid chain across all nodes.
- 🔁 **Node Synchronization** — Seamless blockchain syncing between peers.
- 📉 **Difficulty Adjustment** — Automatically recalibrate mining difficulty.
- 📡 **Redis Pub/Sub Messaging** — Real-time communication between nodes using Redis channels.

## 🧪 Redis Integration

Node-to-node communication is powered by **Redis Pub/Sub**, allowing nodes to broadcast and subscribe to blockchain updates via custom channels (`CHAIN`, `TEST`, etc.).

### Pub/Sub Channels

- `CHAIN` — Used to broadcast the current blockchain for consensus syncing.
- `TEST` — Placeholder channel for testing communication.

### Example

```js
const CHANNELS = {
  TEST: "TEST",
  CHAIN: "CHAIN",
};

this.subscriber.subscribe(CHANNELS.CHAIN);
this.publisher.publish(CHANNELS.CHAIN, JSON.stringify(blockchainData));
```

#### Tech Stack

<ul>
  <li>Node.js — JavaScript runtime</li>
  <li>Express — Web framework for API routes</li>
  <li>Crypto (native) — For hashing and Proof of Work</li>
  <li>Redis — Pub/Sub communication layer for node networking</li>
</ul>

#### Prerequisites

<ul>
  <li>Node.js</li>
  <li>Redis</li>
</ul>

### Setup

#### Clone the repo

```bash
git clone https://github.com/yourusername/node-pow-blockchain.git
cd node-pow-blockchain
```

#### Install dependencies

```bash
npm install
```

#### Start your Redis server (if not already running)

```bash
redis-server

```

#### Run additional nodes (optional)

```bash
PORT=3001 npm start
PORT=3002 npm start

```
![blockchain](https://github.com/user-attachments/assets/5ff54ba7-012a-4b8f-9a42-3cdf5fe4b246)

