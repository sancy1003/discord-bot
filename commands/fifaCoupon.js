const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const cheerio = require("cheerio");

const getHtml = async () => {
  try {
    return await axios.get(
      "https://www.inven.co.kr/board/fifaonline4/3145?category=%EC%BF%A0%ED%8F%B0"
    );
  } catch (error) {
    return interaction.reply(`๐คฌ ์ฟ ํฐ ์กฐํ์ค ์ค๋ฅ๊ฐ ๋ฐ์ํ์ด์.`);
  }
};

const getCouponList = async (interaction) => {
  const html = await getHtml();
  const $ = cheerio.load(html.data);
  const boardList = $(".board-list tr");
  const couponList = [];
  let couponText = "";

  boardList.each(function () {
    const elemClassList = $(this).attr("class")
      ? $(this).attr("class").split(" ")
      : [];
    if (!elemClassList.includes("notice")) {
      const url = $(this).find(".subject-link").attr("href");
      const text = $(this)
        .find(".subject-link")
        .text()
        .split(" ")
        .filter(
          (item) => item.length > 0 && item !== "\n" && item !== "[์ฟ ํฐ]\n"
        )
        .join(" ");

      const date = $(this).find(".date").text();
      if (date) {
        couponList.push({
          url,
          date,
          text,
        });
      }
    }
  });

  for (let i = 0; i < couponList.length; i++) {
    if (i < 20) {
      couponText += `[${i + 1}. ${couponList[i].text}](${couponList[i].url}) [${
        couponList[i].date
      }]\n`;
    }
  }

  const couponEmbed = new MessageEmbed()
    .setColor("#ffffff")
    .setTitle(`์ต๊ทผ ํผํ ์ฟ ํฐ๊ธ ์กฐํ`)
    .setDescription(couponText);

  interaction.reply({
    embeds: [couponEmbed],
  });
};

exports.run = (client, interaction, data) => {
  return getCouponList(interaction);
};

exports.name = "ํผํ์ฟ ํฐ";
