const cheerio = require("cheerio");

const axios = require("axios");

const teams = async () => {
  try {
    const Teams = [];
    const response = await axios.get("https://www.nba.com/teams");

    if (response.status == 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      let teams = $(".team__list").children("a");

      for (var i = 0; i < teams.length; i++) {
        Teams.push({
          teamName: teams[i].children[0].data,
          teamRef: `https://www.nba.com${teams[i].attribs.href}`
        });
      }
    }

    return Teams;
  } catch (err) {
    console.log(err);
  }
};
//teams();
module.exports = teams;
