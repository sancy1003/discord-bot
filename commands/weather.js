const { MessageEmbed } = require("discord.js");
const { getTodayWeather } = require("../api/weather");
const { convertNumberLessThanTen } = require("../utils/common");

const getWeather = async (interaction, local) => {
  interaction.reply(`${local} 날씨 조회중입니다...`);

  const res = await getTodayWeather(local);
  if (!res) {
    interaction.deleteReply();
    interaction.channel.send("날씨 정보가 없습니다.");
  } else {
    const [today, weatherData] = res;
    const todayMonth = convertNumberLessThanTen(today.getMonth() + 1);
    const todayDate = convertNumberLessThanTen(today.getDate());
    const nextDayMonth = convertNumberLessThanTen(
      new Date(new Date(today).setDate(today.getDate() + 1)).getMonth() + 1
    );
    const nextDayDate = convertNumberLessThanTen(
      new Date(new Date(today).setDate(today.getDate() + 1)).getDate()
    );
    let matchText = "";

    for (const [k, v] of weatherData) {
      let time = parseInt(`${k[0]}${k[1]}`);
      matchText += `${"```css\n"}[${
        time >= 1 && time <= 5
          ? `${nextDayMonth}월 ${nextDayDate}일`
          : `${todayMonth}월 ${todayDate}일`
      } ${convertNumberLessThanTen(time)}시 ~ ${convertNumberLessThanTen(
        time + 1
      )}시] 🌞 온도 ${v.find((i) => i.category === "REH").value}˚ / 💦 습도 ${
        v.find((i) => i.category === "REH").value
      }% / ☔ 강수량 ${v.find((i) => i.category === "REH").value}%${"\n```"}`;
    }

    const weatherEmbed = new MessageEmbed()
      .setColor("#ffffff")
      .setTitle(`${todayMonth}월 ${todayDate}일 ${local} 날씨`)
      .setDescription(matchText);

    interaction.deleteReply();
    interaction.channel.send({
      embeds: [weatherEmbed],
    });
  }
};

exports.run = (client, interaction, data) => {
  const local = data[0].value;
  return getWeather(interaction, local);
};

exports.name = "날씨";
