const { GENESIS_BLOCK_DATA, MINING_RATE } = require("./config");
const cryptoHash = require("./cryptoHash");
const hexToBinary = require("hex-to-binary");

class Block {
  constructor({ timestamp, prevHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  // static - cannot be called for objects, only object class
  static createGenesisBlock() {
    return new this(GENESIS_BLOCK_DATA);
  }

  // static method for block mining
  static mine({ prevBlock, data }) {
    // let hash, timestamp;
    // const prevHash = prevBlock.hash;
    // const { difficulty } = prevBlock;
    // let nonce = 0;

    // do {
    //   nonce++;
    //   timestamp = Date.now();
    //   hash = cryptoHash(timestamp, prevHash, nonce, difficulty, data);
    //   console.log(nonce);
    // } while (nonce < 300);

    // while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

    let timestamp = Date.now();
    let nonce = 0;
    let { difficulty } = prevBlock;
    const prevHash = prevBlock.hash;
    let hash = cryptoHash(timestamp, prevHash, nonce, difficulty, data);

    while (true) {
      if (hexToBinary(hash).substring(0, difficulty) === "0".repeat(difficulty))
        break;
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({
        originalBlock: prevBlock,
        timestamp,
      });
      // hash = cryptoHash(timestamp, prevHash, nonce, difficulty, data);
      hash = cryptoHash(timestamp, prevHash, nonce, difficulty, data);
    }

    // console.log(hexToBinary(hash));
    // console.log("break");

    return new this({
      timestamp,
      prevHash,
      hash,
      nonce,
      difficulty,
      data,
    });
  }

  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock;

    if (difficulty < 1) return 1;

    const interval = timestamp - originalBlock.timestamp;
    if (interval > MINING_RATE) return difficulty - 1;
    return difficulty + 1;
  }
}

const genesisBlock = Block.createGenesisBlock();

const block1 = new Block({
  timestamp: Date.now(),
  prevHash: genesisBlock.hash,
  hash: "0xabc",
  data: "block1",
  difficulty: Block.adjustDifficulty({
    originalBlock: genesisBlock,
    timestamp: genesisBlock.timestamp,
  }),
});

// console.log(genesisBlock);

const block2 = Block.mine({
  prevBlock: block1,
  data: "block2",
});

// console.log(block1);
// console.log(block2);
// console.log(typeof block1.timestamp);
// console.log(block2);

module.exports = Block;
