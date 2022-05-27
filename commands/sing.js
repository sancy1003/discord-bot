const sing = async (client, interaction, name) => {
  let user = await interaction.member.fetch();
  let channel = await user.voice.channel;
  if (!channel) {
    interaction.reply("음성 채널에서만 사용 가능한 기능입니다.");
  }

  interaction.reply({ content: `🔍 음악 검색중... ` }).catch((e) => {});

  const queue = await client.player.createQueue(interaction.guild, {
    leaveOnEnd: false,
    autoSelfDeaf: false,
    metadata: interaction.channel,
  });

  try {
    await queue.connect(interaction.member.voice.channel);
  } catch {
    await client.player.deleteQueue(interaction.guild.id);
    return interaction
      .reply({ content: `음악 재생에 문제가 생겼어요. ❌`, ephemeral: true })
      .catch((e) => {});
  }

  const track = await client.player
    .search(name, {
      requestedBy: interaction.user,
    })
    .then((x) => {
      interaction.deleteReply();
      return x.tracks[0];
    });
  queue.play(track);
};

exports.run = async (client, interaction, data) => {
  const name = data[0].value;

  return sing(client, interaction, name);
};

exports.name = "불러";
