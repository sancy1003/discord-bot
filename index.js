const { Player } = require("discord-player");
const { Client, Intents, Collection, MessageEmbed } = require("discord.js");
require("dotenv").config();

const fs = require("fs");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});
client.config = require("./config");
client.commands = new Collection();
client.player = new Player(client, client.config.opt.discordPlayer);
const player = client.player;

player.on("trackStart", (queue, track) => {
  const embed = new MessageEmbed()
    .setColor("#419d6e")
    .setTitle("π΅ μμμ μ¬μν©λλ€.")
    .setDescription(`[${track.title}](${track.url})`);
  queue.metadata
    .send({
      embeds: [embed],
    })
    .catch((e) => {});
});

player.on("trackAdd", (queue, track) => {
  const embed = new MessageEmbed()
    .setColor("#419d6e")
    .setTitle("π μμμ μΆκ°ν©λλ€")
    .setDescription(`[${track.title}](${track.url})`);
  queue.metadata
    .send({
      embeds: [embed],
    })
    .catch((e) => {});
});

// player.on("queueEnd", (queue) => {
//   const embed = new MessageEmbed()
//     .setColor("#dfff70")
//     .setTitle("π€ μμμ λ€ λ€μμ΄μ.")
//     .setDescription(`λ€μ μμμ μΆκ°ν΄μ£ΌμΈμ.`);
//   queue.metadata
//     .send({
//       embeds: [embed],
//     })
//     .catch((e) => {});
// });

client.commands.load = (dir) => {
  for (const file of fs.readdirSync(dir)) {
    const cmd = require(`./commands/${file}`);
    client.commands.set(cmd.name, cmd);
  }
};

client.commands.load(__dirname + "/commands");

client.on("ready", () => {
  client.user.setActivity(`λλ λ°λ§λΆ`, {
    type: "LISTENING",
  });
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const { commandName, options } = interaction;
  let cmd = client.commands.get(commandName);
  if (cmd) await cmd.run(client, interaction, options ? options.data : null);
});

client.login(process.env.DISCORD_TOKKEN);
