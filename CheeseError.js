class CheeseError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

module.exports = CheeseError;