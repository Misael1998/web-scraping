const axios = require("axios");
const cheerio = require("cheerio");

const team = async url => {
  try {
    const response = await axios.get(url);
    const tmpTeam = [];
    if (response.status == 200) {
      const html = response.data;

      const $ = cheerio.load(html);

      let players = $(".nba-player-index__trending-item").children("a");

      for (var i = 0; i < players.length; i++) {
        if (players[i].attribs.title) {
          let tmp = {
            title: players[i].attribs.title,
            href: `https://www.nba.com${players[i].attribs.href}`
          };

          tmpTeam.push(tmp);
        }
      }
      return tmpTeam;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = team;
