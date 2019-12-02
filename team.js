const request = require("request");
const cheerio = require("cheerio");

const team = (url, teams) => {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      let tmpTeam = [];

      let players = $(".nba-player-index__trending-item").children("a");

      for (var i = 0; i < players.length; i++) {
        if (players[i].attribs.title) {
          tmpTeam.push({
            title: players[i].attribs.title,
            href: `https://www.nba.com${players[i].attribs.href}`
          });
        }
      }

      teams = tmpTeam;
    }
  });
};

module.exports = team;
