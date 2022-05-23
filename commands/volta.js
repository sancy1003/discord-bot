const { MessageEmbed } = require("discord.js");
const { getUserAccessId, getUserVoltaHistory } = require("../api/fifa");
const { convertNumberLessThanTen } = require("../utils/common");

const getVoltaHistory = async (interaction, nickname) => {
  const voltaEmbed = new MessageEmbed().setColor("#a2e90b");
  const userAccessId = await getUserAccessId(nickname);
  if (!userAccessId.accessId) return interaction.reply("해당 유저가 없습니다.");
  const matchList = await getUserVoltaHistory(userAccessId.accessId);
  let matchText = "";

  for (const match of matchList) {
    const date = new Date(match.date);
    matchText += `${"```css\n"}[${convertNumberLessThanTen(
      date.getMonth() + 1
    )}-${convertNumberLessThanTen(date.getDate())} ${convertNumberLessThanTen(
      date.getHours()
    )}:${convertNumberLessThanTen(date.getMinutes())}] ${
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
