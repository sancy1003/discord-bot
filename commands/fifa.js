const { MessageEmbed } = require("discord.js");

const helpEmbed = new MessageEmbed()
  .setColor("#a2e90b")
  .setTitle("명령어")
  .addFields({
    name: "- &피파 볼타 [닉네임]",
    value: "최근 볼타 10경기 전적 불러오기",
    inline: true,
  });

const voltaEmbed = new MessageEmbed().setColor("#a2e90b").addFields({
  name: "10전 3승 7패",
  value:
    "[5월 17일 13시 22분]    :rage:    3 : 7 패배\n\n[5월 17일 13시 22분]    :rage:    3 : 7 패배\n\n[5월 17일 13시 22분]    :rage:    3 : 7 패배\n\n[5월 17일 13시 22분]    :rage:    3 : 7 패배\n\n[5월 17일 13시 22분]    :rage:    3 : 7 패배\n\n[5월 17일 13시 22분]    :rage:    3 : 7 패배\n\n[5월 17일 13시 22분]    :rage:    3 : 7 패배\n\n[5월 17일 13시 22분]    :rage:    3 : 7 패배\n\n[5월 17일 13시 22분]    :rage:    3 : 7 패배\n\n",
  inline: true,
});

exports.run = (client, msg, args) => {
  const channel = client.channels.cache.get(msg.channel.id);
  if (args.length === 0) return channel.send({ embeds: [helpEmbed] });
  switch (args[0]) {
    case "볼타":
      return channel.send({
        embeds: [voltaEmbed.setTitle(`${args[1]} 최근 볼타 10경기`)],
      });
    default:
      return channel.send({ embeds: [helpEmbed] });
  }
};

exports.name = "피파";
