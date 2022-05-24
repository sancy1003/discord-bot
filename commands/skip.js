const { MessageEmbed } = require("discord.js");

const skip = async (client, interaction) => {
  const queue = client.player.getQueue(interaction.guild.id);

  if (!queue || !queue.playing)
    return interaction
      .reply({
        content: `재생중인 음악이 없네요.`,
        ephemeral: true,
      })
      .catch((e) => {});

  queue.skip();

  const embed = new MessageEmbed()
    .setColor("#dfff70")
    .setTitle("😭 음악을 스킵했어요.");

  return interaction
    .reply({
      embeds: [embed],
    })
    .catch((e) => {});
};

exports.run = async (client, interaction, data) => {
  return skip(client, interaction);
};

exports.name = "다음";
