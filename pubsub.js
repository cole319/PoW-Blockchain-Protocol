const redis = require("redis");

const CHANNELS = {
  TEST: "TEST",
  CHAIN: "CHAIN",
};

class PubSub {
  constructor({ blockChain }) {
    this.blockChain = blockChain;
    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();

    this.subscriber.subscribe(CHANNELS.TEST);
    this.subscriber.subscribe(CHANNELS.CHAIN);

    this.subscriber.on("message", (channel, message) =>
      this.handleMessage(channel, message)
    );
  }

  handleMessage(channel, message) {
    console.log(`Message Received. CHANNEL: ${channel} || Message: ${message}`);
    const parseMessage = JSON.parse(message);

    if (channel === CHANNELS.CHAIN) {
      this.blockChain.maintainLongestChain(parseMessage);
    }
  }

  publish({ channel, message }) {
    this.publisher.publish(channel, message);
  }

  broadcastChainData() {
    this.publish({
      channel: CHANNELS.CHAIN,
      message: JSON.stringify(this.blockChain.chain),
    });
  }
}

// const checkPubSubModel = new PubSub();
//
// setTimeout(
// () => checkPubSubModel.publisher.publish(CHANNELS.TEST, "hello"),
// 1000
// );

module.exports = PubSub;
