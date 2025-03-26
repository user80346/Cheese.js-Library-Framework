const cheese = require('./cheese');

async function main() {
  const config = {
    token: 'YOUR_TOKEN',  // Override default token
    prefix: '!'          // Override default prefix
  };

  const client = new cheese.CheeseClient({ config: config, token: config.token });

  const pluginManager = new cheese.PluginManager(client);
  pluginManager.loadPlugins();

  const commandManager = new cheese.CommandManager(client);

  client.on('ready', () => {
    console.log('Client is ready!');
  });

  await client.login(config.token);
}

main();