const CheeseClient = require('./CheeseClient.js');
const PluginManager = require('./core/PluginManager.js');
const CommandManager = require('./core/CommandManager.js');
const ConfigManager = require('./core/ConfigManager.js');
const MiddlewareManager = require('./core/MiddlewareManager.js');

module.exports = {
  CheeseClient: CheeseClient,
  PluginManager: PluginManager,
  CommandManager: CommandManager,
  ConfigManager: ConfigManager,
  MiddlewareManager: MiddlewareManager,
  CheeseGuild: require('./CheeseGuild.js'),
  CheeseMessage: require('./CheeseMessage.js'),
  CheeseUser: require('./CheeseUser.js'),
  CheeseError: require('./CheeseError.js'),
};