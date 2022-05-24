const { MessageEmbed } = require("discord.js");

const stop = async (client, interaction) => {
  const queue = client.player.getQueue(interaction.guild.id);

  if (!queue || !queue.playing)
    return interaction
      .reply({
        content: `재생중인 음악이 없네요.`,
        ephemeral: true,
      })
      .catch((e) => {});

  queue.destroy();

  const embed = new MessageEmbed()
    .setColor("#dfff70")
    .setTitle("😭 음악 재생을 멈춥니다.");

  return interaction
    .reply({
      embeds: [embed],
    })
    .catch((e) => {});
};

exports.run = async (client, interaction, data) => {
  return stop(client, interaction);
};

exports.name = "나가";
