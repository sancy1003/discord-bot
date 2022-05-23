require("dotenv").config();

const { Client, Intents, Collection } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const fs = require("fs");

client.commands = new Collection();

client.commands.load = (dir) => {
  for (const file of fs.readdirSync(dir)) {
    const cmd = require(`./commands/${file}`);
    client.commands.set(cmd.name, cmd);
  }
};

client.commands.load(__dirname + "/commands");

client.on("ready", () => {
  client.user.setActivity(`나는 반딧불`, {
    type: "LISTENING",
  });
  console.log(`Logged in as ${client.user.tag}!`);
});

// client.on("message", (msg) => {
//   if (msg.author.bot) return;
// });

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const { commandName, options } = interaction;
  let cmd = client.commands.get(commandName);
  if (cmd) await cmd.run(client, interaction, options.data);
});

client.login(process.env.DISCORD_TOKKEN);
