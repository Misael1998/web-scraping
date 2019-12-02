const teams = require("./teams");
const team = require("./team");
const player = require("./player");

// const callbackTeam = allTeams => {
//   for (var i = 0; i < allTeams.length; i++) {
//     team(allTeams[i], callbackTeams);
//   }
//   // console.log(allTeams);
// };
//
// const callbackTeams = (tmp, players) => {
//   tmp.players = players;
//   for (var i = 0; i < players.length; i++) {
//     player(tmp.players[i], callbackPlayer);
//   }
//
//   console.log(tmp);
// };
//
// const callbackPlayer = (tmp, player) => {
//   tmp.info = player;
// };
//
// teams(callbackTeam);

const t = async () => {
  let test = await teams();
  for (var i = 0; i < test.length; i++) {
    test[i].players = await team(test[i].teamRef);

    // for (var j = 0; j < test[i].players.length; i++) {
    //   test[i].players[j].info = await player(test[i].players[j].href);
    // }

    // for (player of test[i].players) {
    //   player.info = await player(player.href);
    // }
  }

  console.log(test);
};

t();
