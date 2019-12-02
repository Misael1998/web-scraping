const request = require("request");
const cheerio = require("cheerio");

// request("https://www.nba.com/teams", (error, response, html) => {
//   if (!error && response.statusCode == 200) {
//     const $ = cheerio.load(html);
//     let teamRef = [];
//     let teamName = [];
//
//     let teams = $(".team__list").children("a");
//
//     for (var i = 0; i < teams.length; i++) {
//       teamRef.push(teams[i].attribs.href);
//       teamName.push(teams[i].children[0].data);
//     }
//
//     console.log(teamName);
//
//     for (team of teamRef) {
//       let url = `https://www.nba.com${team.toLowerCase()}`;
//       //request(url, )
//       console.log(url);
//     }
//   }
// });

request("https://www.nba.com/teams/bucks", (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    let players = $(".nba-player-index__trending-item")
      .find("a")
      .attr("title");

    console.log(players);
  }
});
