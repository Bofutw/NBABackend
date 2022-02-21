var userJSON = require('./players.json');

let yo = [];
 for(var x in userJSON){
    let y = parseInt(x)+1;
    yo[x] = "("+
'"'+y+'"'+","+
'"'+userJSON[x].name+'"'+","+
"'"+userJSON[x].team_acronym+"'"+","+
"'"+userJSON[x].team_name+"'"+","+
"'"+userJSON[x].games_played+"'"+","+
"'"+userJSON[x].minutes_per_game+"'"+","+
"'"+userJSON[x].field_goals_attempted_per_game+"'"+","+
"'"+userJSON[x].field_goals_made_per_game+"'"+","+
"'"+userJSON[x].field_goal_percentage+"'"+","+
"'"+userJSON[x].free_throw_percentage+"'"+","+
"'"+userJSON[x].three_point_attempted_per_game+"'"+","+
"'"+userJSON[x].three_point_made_per_game+"'"+","+
"'"+userJSON[x].three_point_percentage+"'"+","+
"'"+userJSON[x].points_per_game+"'"+","+
"'"+userJSON[x].offensive_rebounds_per_game+"'"+","+
"'"+userJSON[x].defensive_rebounds_per_game+"'"+","+
"'"+userJSON[x].rebounds_per_game+"'"+","+
"'"+userJSON[x].assists_per_game+"'"+","+
"'"+userJSON[x].steals_per_game+"'"+","+
"'"+userJSON[x].blocks_per_game+"'"+","+
"'"+userJSON[x].turnovers_per_game+"'"+","+
"'"+userJSON[x].player_efficiency_rating+"'"+
    ")";
};   
var mysql = require('mysql');
const { use } = require('express/lib/application');
const { CLIENT_LONG_PASSWORD } = require('mysql/lib/protocol/constants/client');
var database = mysql.createConnection({
	host : '127.0.0.1',
	port : 8889,
	user : 'root',
	password : 'root',
	database : 'nba'
});
 database.connect(function(connectionError){
  if(connectionError){
    throw connectionError;
  }
  for(i=0;i<userJSON.length;i++){
    let sqlgo = "insert into players values" +" "+ yo[i]
    database.query(sqlgo
        ,(queryError)=>{if(queryError){
          throw queryError;
        }})
  }
  database.end((err)=>{
      if(err){
          console.log(err);
      }
  })
}); 