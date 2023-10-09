const cryptoHash = require("./cryptoHash");

const MINING_RATE = 100000;
const INITIAL_DIFFICULTY = 10;

const GENESIS_BLOCK_HASH = cryptoHash(
  "12:14",
  "06-08-2023",
  "Suryarghya Saha",
  "simple blockchain protocol"
);

const GENESIS_BLOCK_DATA = {
  timestamp: 1,
  prevHash: "0x000",
  hash: GENESIS_BLOCK_HASH,
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
  data: "Genesis",
};

// console.log(GENESIS_BLOCK_HASH);
// console.log(GENESIS_BLOCK_DATA.hash);

module.exports = { GENESIS_BLOCK_DATA, MINING_RATE };
