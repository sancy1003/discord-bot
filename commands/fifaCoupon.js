const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const cheerio = require("cheerio");

const getHtml = async () => {
  try {
    return await axios.get(
      "https://www.inven.co.kr/board/fifaonline4/3145?category=%EC%BF%A0%ED%8F%B0"
    );
  } catch (error) {
    return interaction.reply(`🤬 쿠폰 조회중 오류가 발생했어요.`);
    console.error(error);
  }
};

const getCouponList = async (interaction) => {
  const html = await getHtml();
  const $ = cheerio.load(html.data);
  const boardList = $(".board-list tr");
  const couponList = [];
  let couponText = "";

  boardList.each(function (i, elem) {
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
          (item) => item.length > 0 && item !== "\n" && item !== "[쿠폰]\n"
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
    .setTitle(`최근 피파 쿠폰글 조회`)
    .setDescription(couponText);

  interaction.reply({
    embeds: [couponEmbed],
  });
};

exports.run = (client, interaction, data) => {
  return getCouponList(interaction);
};

exports.name = "피파쿠폰";
