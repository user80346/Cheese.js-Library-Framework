# Cheese.js - A Simple Node.js Library and Framework

## Overview

Cheese.js is a lightweight and extensible Node.js library and framework designed to provide a simple structure for building applications. It features a plugin system, configuration management, and command handling, making it easy to extend and customize.

## Features

*   **Plugin System:** Easily extend the core functionality with custom plugins.
*   **Configuration Management:** Manage configuration settings in a structured way.
*   **Command Handling:**  Register, manage, and execute commands with ease.
*   **Middleware Support:** Intercept and process requests/events before they reach the main handler.
*   **Extensible:**  Designed for flexibility and customization.

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/yourusername/cheese.js.git  # Replace with your repo URL
    cd cheese.js
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

## Usage

### Library Usage

```javascript
const cheese = require('cheese.js');

async function main() {
  const config = {
    token: 'YOUR_TOKEN',
    prefix: '!'
  };

  const client = new cheese.CheeseClient({ config: config, token: config.token });
  const pluginManager = new cheese.PluginManager(client);
  const commandManager = new cheese.CommandManager(client);

  pluginManager.loadPlugins(); // Load plugins from the 'plugins' directory

  client.on('ready', () => {
    console.log('CheeseClient is ready!');
  });

  await client.login(config.token);
}

main();
```

## Command-Line Interface (CLI) Usage
The Cheese.js CLI provides a way to interact with your Cheese.js application from the command line.

```
./cheese-cli.js --token YOUR_TOKEN --prefix !
```

or, after `npm link`,

```
cheese --token YOUR_TOKEN --prefix !
```


**Options**:

`--token <token>`: Your API token.

`--prefix <prefix>`: Command prefix (default: `!`).

## Configuration
Configuration settings are managed using the ConfigManager.

**Default Configuration**: The default configuration is loaded from config/default.js. You can modify this file to change the default settings.

```
// config/default.js
module.exports = {
  token: 'YOUR_DEFAULT_TOKEN',
  prefix: '!',
  pluginDir: './plugins'
};
```

**Overriding Configuration**: You can override the default configuration settings by passing a config object to the CheeseClient constructor or by setting environment variables or command-line arguments.

```
const config = {
  token: 'YOUR_TOKEN', // Override the default token
  prefix: '$'         // Override the default prefix
};

const client = new cheese.CheeseClient({ config: config, token: config.token });
```

## Plugin System
The plugin system allows you to easily extend the functionality of Cheese.js.

Create a plugin file in the plugins directory (e.g., plugins/my_plugin.js).

```
// plugins/my_plugin.js
module.exports = {
  load: (client) => {
    console.log('My plugin loaded!');

    // Access configuration
    const prefix = client.config.get('prefix');
    console.log(`Using prefix: ${prefix}`);

    // Add event listeners, commands, etc.
    client.on('ready', () => {
      console.log('My plugin - Client is ready!');
    });
  },
  unload: (client) => {
    console.log('My plugin unloaded.');
    // Clean up resources
  }
};
```

Load plugins using the PluginManager:

```
const pluginManager = new cheese.PluginManager(client);
pluginManager.loadPlugins(); // Loads all .js files from the pluginDir
```

The plugin's load() function will be called when the plugin is loaded, and the unload() function (if defined) will be called when the plugin is unloaded.

## Command Handling
The CommandManager simplifies the process of registering and executing commands.

Create a command file in the commands directory (e.g., commands/my_command.js).

```
// commands/my_command.js
module.exports = {
  name: 'mycommand',
  description: 'A sample command',
  execute(message, args) {
    message.reply('You executed my command!');
  }
};
```

Load commands using the CommandManager:

```
const commandManager = new cheese.CommandManager(client);
```

Execute commands:

```
// Simulate receiving a message
const message = {
  content: '!mycommand',
  author: { username: 'TestUser' },
  reply: (text) => console.log(`Reply: ${text}`)
};

if (message.content.startsWith(client.config.get('prefix'))) {
  const args = message.content.slice(client.config.get('prefix').length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  commandManager.executeCommand(message, commandName, args);
}
```

## Middleware Support
Middleware allows you to intercept and process requests or events.

```
const cheese = require('cheese.js');

async function main() {
    const client = new cheese.CheeseClient({token: 'YOUR_TOKEN'});
    const middlewareManager = new cheese.MiddlewareManager();

    // Example middleware
    middlewareManager.use(async (context) => {
        console.log('Middleware running...');
        context.message.content = context.message.content.toUpperCase();
    });

    client.on('message', async (message) => {
        const context = { message }; // Create a context object
        await middlewareManager.run(context);
        console.log(context.message.content); // Message content is now uppercase
    });
}
```

## Examples
See the examples/ directory for more detailed examples. (Add an examples directory with example code if you want!)

## Contributing
Contributions are welcome! Please submit a pull request.
