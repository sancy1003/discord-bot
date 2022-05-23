const { MessageEmbed } = require("discord.js");
const { getUserAccessId, getUserVoltaHistory } = require("../api/fifa");

const helpEmbed = new MessageEmbed()
  .setColor("#a2e90b")
  .setTitle("명령어")
  .addFields({
    name: "- &볼타 [닉네임]",
    value: "최근 볼타 10경기 전적 불러오기",
    inline: true,
  });

const getVoltaHistory = async (interaction, nickname) => {
  const voltaEmbed = new MessageEmbed().setColor("#a2e90b");
  const userAccessId = await getUserAccessId(nickname);
  if (!userAccessId.accessId) return interaction.reply("해당 유저가 없습니다.");
  const matchList = await getUserVoltaHistory(userAccessId.accessId);
  let matchText = "";

  for (const match of matchList) {
    const date = new Date(match.date);
    matchText += `${"```css\n"}[${date.getMonth() + 1 < 10 ? "0" : ""}${
      date.getMonth() + 1
    }-${date.getDate() < 10 ? "0" : ""}${date.getDate()} ${
      date.getHours() < 10 ? "0" : ""
    }${date.getHours()}:${
      date.getMinutes() < 10 ? "0" : ""
    }${date.getMinutes()}] ${
      match.result === "승" ? "😍" : match.result === "무" ? "💤" : "🤬"
    } ${match.result} (⭐ ${match.rating.toFixed(2)})${"\n```"}`;
  }

  voltaEmbed.setTitle(`:soccer: ${nickname} 최근 볼타 10경기`).addFields({
    name: `${matchList.length}전 ${
      matchList.filter((v) => v.result === "승").length
    }승 ${matchList.filter((v) => v.result === "무").length}무 ${
      matchList.filter((v) => v.result === "패").length
    }패`,
    value: matchText,
  });

  return interaction.reply({
    embeds: [voltaEmbed],
  });
};

exports.run = (client, interaction, data) => {
  const nickname = data[0].value;
  return getVoltaHistory(interaction, nickname);
};

exports.name = "볼타";
