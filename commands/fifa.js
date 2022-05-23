const { MessageEmbed } = require("discord.js");
const { getUserAccessId, getUserVoltaHistory } = require("../api/fifa");

const helpEmbed = new MessageEmbed()
  .setColor("#a2e90b")
  .setTitle("명령어")
  .addFields({
    name: "- &피파 볼타 [닉네임]",
    value: "최근 볼타 10경기 전적 불러오기",
    inline: true,
  });

const getVoltaHistory = async (channel, msg, args) => {
  const voltaEmbed = new MessageEmbed().setColor("#a2e90b");
  const userAccessId = await getUserAccessId(args[1]);
  if (!userAccessId.accessId)
    return msg.reply(`해당 유저가 존재하지 않습니다.`);
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

  voltaEmbed.setTitle(`:soccer: ${args[1]} 최근 볼타 10경기`).addFields({
    name: `${matchList.length}전 ${
      matchList.filter((v) => v.result === "승").length
    }승 ${matchList.filter((v) => v.result === "무").length}무 ${
      matchList.filter((v) => v.result === "패").length
    }패`,
    value: matchText,
  });

  return channel.send({
    embeds: [voltaEmbed],
  });
};

exports.run = (client, msg, args) => {
  const channel = client.channels.cache.get(msg.channel.id);
  if (args.length < 2) return channel.send({ embeds: [helpEmbed] });
  switch (args[0]) {
    case "볼타":
      getVoltaHistory(channel, msg, args);
      break;
    default:
      return channel.send({ embeds: [helpEmbed] });
  }
};

exports.name = "피파";
