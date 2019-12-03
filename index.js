const teams = require("./teams");
const team = require("./team");
const player = require("./player");
const fs = require("fs");

const getData = async () => {
  try {
    let data = await teams();
    for (let i = 0; i < data.length; i++) {
      data[i].players = await team(data[i].teamRef);

      for (let j = 0; j < data[i].players.length; j++) {
        data[i].players[j].info = await player(data[i].players[j].href);
      }
    }
    const filePath = `data/${Date.now()}nbaData.json`;
    const writeStream = fs.createWriteStream(filePath);

    writeStream.write(JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

getData();
