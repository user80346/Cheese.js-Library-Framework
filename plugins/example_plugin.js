module.exports = {
    load: (client) => {
      console.log('Example plugin loaded.');
      // Access config
      const prefix = client.config.get('prefix');
      console.log(`Plugin using prefix: ${prefix}`);
  
      // You can add event listeners, commands, or other functionality here
      client.on('ready', () => {
        console.log('Example plugin - Client is ready!');
      });
    },
  
    unload: (client) => {
      console.log('Example plugin unloaded.');
      // Clean up any resources used by the plugin (e.g., remove event listeners)
    }
  };