#!/usr/bin/env node
const { program } = require('commander');
const chalk = require('chalk');
const { CheeseClient, PluginManager, CommandManager, ConfigManager } = require('./cheese');  // Correct path

program
  .version('0.2.0')
  .description('A command-line tool for interacting with the Cheese.js library/framework.')
  .option('-t, --token <token>', 'The Cheese.js API token')
  .option('-p, --prefix <prefix>', 'Command prefix', '!')
  .command('status', 'Check the status of the Cheese.js client')
  .parse(process.argv);

const options = program.opts();

if (options.token) {
  console.log(chalk.green('Token provided: ') + chalk.yellow(options.token));

  // Initialize the ConfigManager
  const configManager = new ConfigManager();
  configManager.set('token', options.token); // Set the token from the CLI
  configManager.set('prefix', options.prefix); // Set the prefix from the CLI
  const config = configManager.getConfig();

  // Initialize the CheeseClient with the ConfigManager instance
  const client = new CheeseClient({ config: config, token: options.token });

  // Initialize the PluginManager and load plugins
  const pluginManager = new PluginManager(client);
  pluginManager.loadPlugins();

  // Initialize the CommandManager and load commands
  const commandManager = new CommandManager(client);

  client.on('ready', () => {
      console.log(chalk.green('CheeseClient is ready!'));

      // Example usage: Simulate receiving a message
      const message = {
          content: `${config.prefix}ping`,
          author: { username: 'TestUser' },
          reply: (text) => console.log(chalk.blue(`Reply: ${text}`)),
      };

      // Simulate parsing command and arguments
      if (message.content.startsWith(config.prefix)) {
          const args = message.content.slice(config.prefix.length).trim().split(/ +/);
          const commandName = args.shift().toLowerCase();
          commandManager.executeCommand(message, commandName, args);
      }
  });

  client.login(options.token).catch(error => {
    console.error(chalk.red('Login error:'), error);
  });

} else {
  console.log(chalk.red('Error: No token provided. Use --token <your_token>'));
}