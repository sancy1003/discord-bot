require("dotenv").config();

const fetch = require("node-fetch");

exports.getUserAccessId = async (nickname) =>
  await (
    await fetch(
      `https://api.nexon.co.kr/fifaonline4/v1.0/users?nickname=${nickname}`,
      {
        headers: {
          Authorization: process.env.NEXON_KEY,
        },
      }
    )
  ).json();

exports.getUserVoltaHistory = async (accessId) => {
  const matchHistoryIdList = await (
    await fetch(
      `https://api.nexon.co.kr/fifaonline4/v1.0/users/${accessId}/matches?matchtype=214&offset=0&limit=10`,
      {
        headers: {
          Authorization: process.env.NEXON_KEY,
        },
      }
    )
  ).json();

  const matchInfoList = await filterMatch(matchHistoryIdList, accessId);
  return matchInfoList;
};

const filterMatch = async (matchHistoryIdList, accessId) => {
  const matchInfoList = [];
  for (const matchId of matchHistoryIdList) {
    const apiInfo = await (
      await fetch(
        `https://api.nexon.co.kr/fifaonline4/v1.0/matches/${matchId}`,
        {
          headers: {
            Authorization: process.env.NEXON_KEY,
          },
        }
      )
    ).json();

    if (apiInfo) {
      let matchInfo = {
        date: apiInfo.matchDate,
        rating: 0,
        result: "승",
      };
      apiInfo.matchInfo.forEach((data) => {
        if (data.accessId === accessId) {
          matchInfo.result = data.matchDetail.matchResult;
          matchInfo.rating = data?.player[0]?.status
            ? data?.player[0]?.status?.spRating
            : 0;
          return;
        }
      });
      matchInfoList.push(matchInfo);
    }
  }
  return matchInfoList;
};
