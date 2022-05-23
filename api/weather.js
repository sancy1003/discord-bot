const { convertNumberLessThanTen } = require("../utils/common");
const fetch = require("node-fetch");
const { localList } = require("../utils/weatherLocal");
require("dotenv").config();

exports.getTodayWeather = async (local) => {
  const localData = localList.find((data) => data.name === local);
  if (!localData) return null;

  const today =
    new Date().getHours() >= 5
      ? new Date()
      : new Date(new Date().setDate(new Date().getDate() - 1));
  const baseDate = `${today.getFullYear()}${convertNumberLessThanTen(
    today.getMonth() + 1
  )}${convertNumberLessThanTen(today.getDate())}`;
  let nx = localData.nx;
  let ny = localData.ny;
  let data = null;

  try {
    data = await (
      await fetch(
        `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${process.env.WEATHER_SERVICE_KEY}&pageNo=1&numOfRows=289&dataType=JSON&base_date=${baseDate}&base_time=0500&nx=${nx}&ny=${ny}`
      )
    ).json();
  } catch (error) {
    console.log(error);
    return null;
  }

  if (data?.response?.body?.items?.item) {
    let weatherInfoList = [...data?.response?.body?.items?.item];
    let weatherMap = new Map();
    for (const info of weatherInfoList) {
      if (
        info.category === "TMP" ||
        info.category === "POP" ||
        info.category === "REH"
      ) {
        if (weatherMap.has(info.fcstTime)) {
          weatherMap.set(info.fcstTime, [
            ...weatherMap.get(info.fcstTime),
            { category: info.category, value: info.fcstValue },
          ]);
        } else {
          weatherMap.set(info.fcstTime, [
            {
              category: info.category,
              value: info.fcstValue,
            },
          ]);
        }
      }
    }
    return [today, weatherMap];
  } else {
    return null;
  }
};
