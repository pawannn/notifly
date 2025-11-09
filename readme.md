# Logifly

> Multi-platform notification SDK. Send messages to Discord, Slack, and more with a unified API.

## Installation

```bash
npm install logifly
```

## Quick Start

```javascript
import logifly from 'logifly';

// Discord
const discord = logifly.newDiscordClient({
  webhookUrl: 'YOUR_DISCORD_WEBHOOK_URL'
});

// Slack
const slack = logifly.newSlackClient({
  webhookUrl: 'YOUR_SLACK_WEBHOOK_URL'
});

// Send messages
await discord.send('Hello Discord! 🚀');
await slack.send('Hello Slack! 👋');
```

## Platforms

### Discord

```javascript
const discord = logifly.newDiscordClient({
  webhookUrl: 'https://discord.com/api/webhooks/...',
  username: 'My Bot',           // Optional
  avatarUrl: 'https://...',     // Optional
  defaultColor: 0x00ff00        // Optional
});
```

### Slack

```javascript
const slack = logifly.newSlackClient({
  webhookUrl: 'https://hooks.slack.com/services/...',
  username: 'My Bot',           // Optional
  iconEmoji: ':robot_face:',    // Optional
  channel: '#alerts'            // Optional
});
```

## Send Messages

### Simple Text

```javascript
await discord.send('Server is running');
await slack.send('Deployment started');
```

### Status Messages

```javascript
// Success (Green)
await discord.sendSuccess('Deployment Complete', 'Version 2.0 is live');
await slack.sendSuccess('Build Passed', 'All tests passed');

// Error (Red)
await discord.sendError('Build Failed', 'Tests failed on line 42');
await slack.sendError('Database Error', 'Connection timeout');

// Warning (Yellow)
await discord.sendWarning('High Memory', 'Usage at 85%');
await slack.sendWarning('API Slow', 'Response time > 2s');

// Info (Blue)
await discord.sendInfo('Maintenance', 'Scheduled in 1 hour');
await slack.sendInfo('New Release', 'Version 3.0 available');
```

### Rich Embeds

```javascript
await discord.sendEmbed({
  title: '📊 System Report',
  description: 'Daily metrics',
  color: 0x3498db,
  fields: [
    { name: 'Uptime', value: '99.9%', inline: true },
    { name: 'Requests', value: '1.2M', inline: true },
    { name: 'Errors', value: '23', inline: true }
  ]
});

await slack.sendEmbed({
  title: '📊 System Report',
  description: 'Daily metrics',
  color: 0x3498db,
  fields: [
    { name: 'Uptime', value: '99.9%', inline: true },
    { name: 'Requests', value: '1.2M', inline: true }
  ]
});
```

## Broadcast Groups

Send to multiple platforms or channels at once:

```javascript
// Create clients
const discordAlerts = logifly.newDiscordClient({ webhookUrl: 'DISCORD_URL_1' });
const discordLogs = logifly.newDiscordClient({ webhookUrl: 'DISCORD_URL_2' });
const slackTeam = logifly.newSlackClient({ webhookUrl: 'SLACK_URL' });

// Group them
const group = logifly.createGroup('critical-alerts', [
  discordAlerts,
  discordLogs,
  slackTeam
]);

// Broadcast to all
await group.broadcast('🚨 Server down!');
await group.broadcastSuccess('Deploy Complete', 'All systems go');
await group.broadcastError('Database Failure', 'Unable to connect');
```

### Manage Groups

```javascript
// Add more clients
group.addClient(anotherClient, 'optional-alias');

// List clients
console.log(group.listClients());
// [{ alias: 'client_1', platform: 'discord' }, ...]

// Remove client
group.removeClient('client_1');

// Get group by name
const myGroup = logifly.getGroup('critical-alerts');

// List all groups
console.log(logifly.listGroups());
// ['critical-alerts', 'logs', ...]

// Delete group
logifly.deleteGroup('critical-alerts');
```

## API Reference

### Client Methods

| Method | Description |
|--------|-------------|
| `send(message)` | Send simple text message |
| `sendSuccess(title, desc)` | Send success message (green) |
| `sendError(title, desc)` | Send error message (red) |
| `sendWarning(title, desc)` | Send warning message (yellow) |
| `sendInfo(title, desc)` | Send info message (blue) |
| `sendEmbed(options)` | Send rich formatted message |
| `testConnection()` | Test webhook connection |

### Group Methods

| Method | Description |
|--------|-------------|
| `broadcast(message)` | Send to all clients in group |
| `broadcastSuccess(title, desc)` | Send success to all |
| `broadcastError(title, desc)` | Send error to all |
| `broadcastWarning(title, desc)` | Send warning to all |
| `broadcastInfo(title, desc)` | Send info to all |
| `broadcastEmbed(options)` | Send embed to all |
| `addClient(client, alias?)` | Add client to group |
| `removeClient(alias)` | Remove client from group |
| `listClients()` | List all clients |
| `size()` | Get client count |
| `testConnections()` | Test all connections |

### SDK Methods

| Method | Description |
|--------|-------------|
| `newDiscordClient(config)` | Create Discord client |
| `newSlackClient(config)` | Create Slack client |
| `createGroup(name, clients?)` | Create broadcast group |
| `getGroup(name)` | Get existing group |
| `listGroups()` | List all groups |
| `deleteGroup(name)` | Delete a group |
| `getVersion()` | Get SDK version |

## Real-World Examples

### Server Monitoring

```javascript
const monitor = logifly.newDiscordClient({ 
  webhookUrl: process.env.DISCORD_WEBHOOK 
});

if (cpuUsage > 80) {
  await monitor.sendWarning('High CPU', `Usage: ${cpuUsage}%`);
}
```

### Multi-Platform Alerts

```javascript
const alerts = logifly.createGroup('production-alerts', [
  logifly.newDiscordClient({ webhookUrl: process.env.DISCORD_WEBHOOK }),
  logifly.newSlackClient({ webhookUrl: process.env.SLACK_WEBHOOK })
]);

await alerts.broadcastError('API Down', 'Health check failed');
```

### CI/CD Pipeline

```javascript
const deploy = logifly.newSlackClient({ 
  webhookUrl: process.env.SLACK_WEBHOOK 
});

await deploy.sendInfo('Deploy Started', 'Building v2.1.0');

try {
  // deployment logic
  await deploy.sendSuccess('Deploy Complete', 'v2.1.0 is live! 🎉');
} catch (error) {
  await deploy.sendError('Deploy Failed', error.message);
}
```

## Environment Variables

```bash
# .env
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

```javascript
import logifly from 'logifly';

const discord = logifly.newDiscordClient({
  webhookUrl: process.env.DISCORD_WEBHOOK_URL
});

const slack = logifly.newSlackClient({
  webhookUrl: process.env.SLACK_WEBHOOK_URL
});
```

## Error Handling

```javascript
try {
  await discord.send('Hello');
} catch (error) {
  console.error('Failed:', error.message);
  
  if (error.code === 'CONFIGURATION_ERROR') {
    // Invalid configuration
  } else if (error.code === 'MESSAGE_SEND_ERROR') {
    // Network or API error
  }
}
```

## Platform Support

| Platform | Status |
|----------|--------|
| Discord | ✅ Available |
| Slack | ✅ Available |
| Microsoft Teams | 🔜 Coming Soon |
| Telegram | 🔜 Coming Soon |
| Email | 🔜 Coming Soon |
| SMS (Twilio) | 🔜 Coming Soon |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © Pawan Kalyan

---

**[GitHub](https://github.com/pawannn/logifly)** • **[npm](https://www.npmjs.com/package/logifly)** • **[Issues](https://github.com/pawannn/logifly/issues)**