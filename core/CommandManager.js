const fs = require('fs');
const path = require('path');

class CommandManager {
  constructor(client, commandDir = './commands') {
    this.client = client;
    this.commandDir = commandDir;
    this.commands = new Map();
    this.loadCommands();
  }

  loadCommands() {
    if (!fs.existsSync(this.commandDir)) {
      console.warn(`Command directory "${this.commandDir}" not found.`);
      return;
    }

    const files = fs.readdirSync(this.commandDir).filter(file => file.endsWith('.js'));

    for (const file of files) {
      const commandPath = path.join(this.commandDir, file);
      try {
        const command = require(commandPath);
        if (typeof command.name !== 'string' || typeof command.execute !== 'function') {
          console.warn(`Command "${file}" is missing 'name' or 'execute' property.`);
          continue;
        }
        this.commands.set(command.name, command);
        console.log(`Loaded command: ${command.name}`);
      } catch (error) {
        console.error(`Failed to load command "${file}":`, error);
      }
    }
  }

  executeCommand(message, commandName, args) {
    const command = this.commands.get(commandName);
    if (!command) {
      console.warn(`Command "${commandName}" not found.`);
      return;
    }

    try {
      command.execute(message, args);
    } catch (error) {
      console.error(`Failed to execute command "${commandName}":`, error);
      message.reply('There was an error executing that command!');
    }
  }
}

module.exports = CommandManager;