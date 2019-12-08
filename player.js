const axios = require("axios");
const cheerio = require("cheerio");

const player = async url => {
  const playerInfo = {
    nacimiento: null,
    origen: null,
    altura: null,
    peso: null
  };

  try {
    const response = await axios.get(url);
    if (response.status == 200) {
      const html = response.data;

      const $ = cheerio.load(html);

      let altura = $(".nba-player-vitals__top-left")
        .children(".nba-player-vitals__top-info-metric")
        .text();

      let peso = $(".nba-player-vitals__top-right")
        .children(".nba-player-vitals__top-info-metric")
        .text();

      let info = $(".nba-player-vitals__bottom")
        .children("ul")
        .children("li")
        .children(".nba-player-vitals__bottom-info");

      let tmp = [];
      for (var i = 0; i < info.length; i++) {
        try {
          if (info[i].name == "span") {
            let subTmp = info[i].children[0].data;
            subTmp = subTmp.replace("\n", "");
            subTmp = subTmp.replace("\n", "");

            tmp.push(subTmp.replace(/ /g, ""));
          }
        } catch (err) {
          tmp.push(null);
        }
      }

      playerInfo.nacimiento = tmp[0];
      playerInfo.origen = tmp[2];

      if (tmp[3] == "-") playerInfo.debut = null;
      else playerInfo.debut = parseInt(tmp[3]);

      altura = altura.replace("/", "");
      altura = altura.replace("\n", "");
      altura = altura.replace("m", "");
      altura = altura.replace(" ", "");
      altura = parseFloat(altura);
      playerInfo.altura = altura;

      peso = peso.replace("/", "");
      peso = peso.replace("\n", "");
      peso = peso.replace("m", "");
      peso = peso.replace(" ", "");
      peso = parseFloat(peso);
      playerInfo.peso = peso;

      if (playerInfo.origen == "NoCollege") playerInfo.origen = null;

      return playerInfo;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = player;
