class CheeseUser {
  constructor(id, username) {
    this.id = id;
    this.username = username;
    console.log(`CheeseUser created: ${this.username} (ID: ${this.id})`);
  }

  send(message) {
    console.log(`Sending direct message to ${this.username}: ${message}`);
  }

  toString() {
    return `CheeseUser: ${this.username} (ID: ${this.id})`;
  }
}

module.exports = CheeseUser;