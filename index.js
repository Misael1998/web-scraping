const teams = require("./teams");
const team = require("./team");
const player = require("./player");
const fs = require("fs");
//const writeStream = fs.createWriteStream(`data/${Date.now()}nbaData.json`);

const getData = async () => {
  try {
    let data = await teams();
    for (let i = 0; i < data.length; i++) {
      data[i].players = await team(data[i].teamRef);

      for (let j = 0; j < data[i].players; j++) {
        data[i].players[j].info = await player(data[i].players[j].herf);
      }
    }
    const filePath = `data/${Date.now()}nbaData.json`;
    const writeStream = fs.createWriteStream(filePath);

    await writeStream.write(JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }

  // fs.writeFile(
  //   `./data/${Date.now()}nbaData.json`,
  //   data,
  //
  //   err => {
  //     if (err) console.log(err);
  //     else console.log("It's saved!");
  //   }
  // );

  // const fd = fs.openSync(filePath, "w");
  //
  // fd.writeFile(filePath, data, err => {
  //   if (err) throw err;
  //   console.log("It's saved!");
  // });
  //
  // fd.colseSync();
};

getData();
