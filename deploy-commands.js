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
  new SlashCommandBuilder()
    .setName("날씨")
    .setDescription("오늘 날씨를 조회합니다.")
    .addStringOption((option) =>
      option
        .setName("지역명")
        .setDescription("구/시/군 단위의 지역명 ex) 동대문구")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("불러")
    .setDescription("음악을 재생합니다.")
    .addStringOption((option) =>
      option
        .setName("음악명")
        .setDescription("듣고싶은 음악명을 입력해주세요.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("다음")
    .setDescription("음악을 스킵합니다."),
  new SlashCommandBuilder()
    .setName("비워")
    .setDescription("음악을 재생 목록을 비웁니다."),
  new SlashCommandBuilder()
    .setName("목록")
    .setDescription("음악 재생 목록을 보여줍니다."),
  new SlashCommandBuilder()
    .setName("나가")
    .setDescription("음악 재생 중단합니다."),
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
