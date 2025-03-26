class CheeseMessage {
  constructor(content, author, channel) {
    this.content = content;
    this.author = author; // CheeseUser object
    this.channel = channel; // Could be a CheeseChannel object (not implemented)
    this.id = Math.random().toString(36).substring(2, 15); // Generate a random ID.
    console.log(`CheeseMessage created: ${this.content}`);
  }

  reply(message) {
    console.log(`Replying to message ${this.id}: ${message}`);
  }

  toString() {
    return `CheeseMessage (ID: ${this.id}): ${this.content} - Author: ${this.author.username}`;
  }
}

module.exports = CheeseMessage;