const Block = require("./Block");
const cryptoHash = require("./cryptoHash");

// console.log("hello1");

class Blockchain {
  constructor() {
    this.chain = [Block.createGenesisBlock()];
  }

  addBlock({ data }) {
    const newBlock = Block.mine({
      prevBlock: this.chain[this.chain.length - 1],
      data,
    });
    this.chain.push(newBlock);
  }

  // To replace existing chain with longer chain
  maintainLongestChain(chain) {
    if (chain.length <= this.chain.length) {
      console.error("shorter chain detected");
      return;
    }
    if (!Blockchain.isValidChain(chain)) {
      console.error("Invalid chain detected");
    }
    this.chain = chain;
  }

  // static method to check chain validity
  static isValidChain(chain) {
    // Validate genesis block
    if (
      JSON.stringify(chain[0]) !== JSON.stringify(Block.createGenesisBlock())
    ) {
      return false;
    }

    // Validate rest of the chain
    for (let i = 1; i < chain.length; i++) {
      const { timestamp, prevHash, hash, nonce, difficulty, data } = chain[i];

      // Validate prevHash
      const lastBlockHash = chain[i - 1].hash;
      if (prevHash !== lastBlockHash) {
        return false;
      }

      // Validate Hash
      const validHash = cryptoHash(
        timestamp,
        prevHash,
        nonce,
        difficulty,
        data
      );
      if (hash !== validHash) {
        return false;
      }
    }
    return true;
  }
}

// console.log("hello");
const blockChain1 = new Blockchain();
blockChain1.addBlock({ data: "Block1" });
blockChain1.addBlock({ data: "Block2" });
blockChain1.addBlock({ data: "Block3" });

// const validChain = Blockchain.isValidChain(blockChain1.chain);
console.log(blockChain1.chain);
// console.log(validChain);

module.exports = Blockchain;
