const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, Partials } = require('discord.js');
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember } = Partials;

// Create a new client instance
const client = new Client({ intents: [ Guilds, GuildMembers, GuildMessages],
  partials: [ User, Message, GuildMember ]
});

const { loadEvents } = require("./Handlers/eventHandler");

client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();
client.cooldowns = new Collection();

loadEvents(client);

// Log in to Discord with your client's token
client.login(process.env['DISCORD_TOKEN']);