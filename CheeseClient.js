const CheeseGuild = require('./CheeseGuild');
const CheeseError = require('./CheeseError');

class CheeseClient {
  constructor(options = {}) {
    this.token = options.token || null;
    this.user = null;
    this.guilds = new Map();
    this.ready = false;
    this.config = options.config || {}; // Access to global config

    if (!this.token) {
      throw new CheeseError("CHEESE_CLIENT_NO_TOKEN: Token is required for CheeseClient.");
    }

    console.log("CheeseClient created with config:", this.config);
  }

  login(token) {
    return new Promise((resolve, reject) => {
      if (!token && !this.token) {
        reject(new CheeseError("CHEESE_CLIENT_LOGIN_NO_TOKEN: No token provided for login."));
        return;
      }

      const authToken = token || this.token;

      setTimeout(() => {
        if (authToken === 'INVALID_TOKEN') {
          reject(new CheeseError("CHEESE_CLIENT_LOGIN_INVALID_TOKEN: Invalid token provided."));
          return;
        }

        console.log("CheeseClient logged in with token:", authToken);
        this.user = { id: '12345', username: 'CheeseBot' };
        this.ready = true;
        this.emit('ready');
        resolve('LOGIN_SUCCESS');
      }, 1000);
    });
  }

  getGuild(guildId) {
    if (this.guilds.has(guildId)) {
      return this.guilds.get(guildId);
    } else {
      throw new CheeseError(`CHEESE_GUILD_NOT_FOUND: Guild with ID ${guildId} not found.`);
    }
  }

  emit(event, ...args) { // Basic event emitter
    if (event === 'ready' && this.readyListener) {
      this.readyListener(...args);
    }
  }

  on(event, listener) {
    if (event === 'ready') {
      this.readyListener = listener;
    }
  }
}

module.exports = CheeseClient;