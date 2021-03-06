const { MessageEmbed } = require("discord.js");

const clear = async (client, interaction) => {
  const queue = client.player.getQueue(interaction.guild.id);
  const embed = new MessageEmbed()
    .setColor("#dfff70")
    .setTitle("π μ¬μ λͺ©λ‘μ λΉμ μ΄μ.");

  if (!queue || !queue.playing)
    return interaction
      .reply({
        embeds: [embed.setTitle("π μ¬μ λͺ©λ‘μ΄ μμ΄μ.")],
      })
      .catch((e) => {});

  if (!queue.tracks[0])
    return interaction
      .reply({
        embeds: [embed.setTitle("π μ¬μ λͺ©λ‘μ΄ μμ΄μ.")],
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

exports.name = "λΉμ";
