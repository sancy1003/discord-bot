const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

const commands = [
  new SlashCommandBuilder()
    .setName("볼타")
    .setDescription("볼타 전적을 검색합니다.")
    .addStringOption((option) =>
      option
        .setName("닉네임")
        .setDescription("닉네임을 입력하세요.")
        .setRequired(true)
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKKEN);

rest
  .put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID
    ),
    { body: commands }
  )
  .then(() => console.log("성공했습니다."))
  .catch(console.error);