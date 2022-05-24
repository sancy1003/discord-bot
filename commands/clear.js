const { MessageEmbed } = require("discord.js");

const clear = async (client, interaction) => {
  const queue = client.player.getQueue(interaction.guild.id);
  const embed = new MessageEmbed()
    .setColor("#dfff70")
    .setTitle("😉 재생 목록을 비웠어요.");

  if (!queue || !queue.playing)
    return interaction
      .reply({
        embeds: [embed.setTitle("😉 재생 목록이 없어요.")],
      })
      .catch((e) => {});

  if (!queue.tracks[0])
    return interaction
      .reply({
        embeds: [embed.setTitle("😉 재생 목록이 없어요.")],
      })
      .catch((e) => {});

  await queue.clear();

  return interaction
    .reply({
      embeds: [embed],
    })
    .catch((e) => {});
};

exports.run = async (client, interaction, data) => {
  return clear(client, interaction);
};

exports.name = "비워";
