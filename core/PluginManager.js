const fs = require('fs');
const path = require('path');

class PluginManager {
  constructor(client, pluginDir = './plugins') {
    this.client = client; // Pass the client instance
    this.pluginDir = pluginDir;
    this.plugins = new Map();
  }

  loadPlugins() {
    if (!fs.existsSync(this.pluginDir)) {
      console.warn(`Plugin directory "${this.pluginDir}" not found.`);
      return;
    }

    const files = fs.readdirSync(this.pluginDir).filter(file => file.endsWith('.js'));

    for (const file of files) {
      const pluginPath = path.join(this.pluginDir, file);
      try {
        const plugin = require(pluginPath);
        if (typeof plugin.load !== 'function') {
          console.warn(`Plugin "${file}" does not export a 'load' function and won't be loaded.`);
          continue;
        }
        plugin.load(this.client);  // Pass the client to the plugin
        this.plugins.set(pluginPath, plugin);
        console.log(`Loaded plugin: ${file}`);
      } catch (error) {
        console.error(`Failed to load plugin "${file}":`, error);
      }
    }
  }

  unloadPlugin(pluginPath) {
    if (this.plugins.has(pluginPath)) {
      const plugin = this.plugins.get(pluginPath);
      if (typeof plugin.unload === 'function') {
        plugin.unload(this.client); // Pass the client for unloading
      }
      this.plugins.delete(pluginPath);
      console.log(`Unloaded plugin: ${pluginPath}`);
    }
  }
}

module.exports = PluginManager;