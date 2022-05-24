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
    .setTitle("🎵 음악을 재생합니다.")
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
    .setTitle("👀 음악을 추가합니다")
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
//     .setTitle("🤗 음악을 다 들었어요.")
//     .setDescription(`다음 음악을 추가해주세요.`);
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
  client.user.setActivity(`나는 반딧불`, {
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
