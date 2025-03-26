const fs = require('fs');
const path = require('path');

class ConfigManager {
  constructor(configDir = './config') {
    this.configDir = configDir;
    this.config = {};
    this.loadConfig();
  }

  loadConfig() {
    const defaultConfigPath = path.join(this.configDir, 'default.js');
    if (fs.existsSync(defaultConfigPath)) {
      this.config = require(defaultConfigPath);
    } else {
      console.warn("No default configuration found. Using empty configuration.");
      this.config = {};
    }
  }

  get(key, defaultValue = null) {
    return this.config[key] !== undefined ? this.config[key] : defaultValue;
  }

  set(key, value) {
    this.config[key] = value;
  }

  getConfig() {
    return this.config;
  }
}

module.exports = ConfigManager;