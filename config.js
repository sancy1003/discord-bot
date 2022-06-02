module.exports = {
  opt: {
    maxVol: 100, // bot 기본 마이크 크기
    discordPlayer: {
      ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25,
      },
    },
  },
};
