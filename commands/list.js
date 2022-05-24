const { MessageEmbed } = require("discord.js");

const skip = async (client, interaction) => {
  const queue = client.player.getQueue(interaction.guild.id);
  const embed = new MessageEmbed().setColor("#419d6e").setTitle("재생 목록");

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

  const tracks = queue.tracks.map(
    (track, i) =>
      `**${i + 1}** - ${track.title} | ${track.author} <@${
        track.requestedBy.id
      }>`
  );

  const songs = queue.tracks.length;
  const nextSongs = songs > 5 ? `+ **${songs - 5}**개의 다른 음악` : ``;

  embed.setDescription(
    `재생중 \`${queue.current.title}\`\n\n${tracks
      .slice(0, 5)
      .join("\n")}\n\n${nextSongs}`
  );

  interaction.reply({ embeds: [embed] }).catch((e) => {});

  return interaction
    .reply({
      embeds: [embed],
    })
    .catch((e) => {});
};

exports.run = async (client, interaction, data) => {
  return skip(client, interaction);
};

exports.name = "목록";
