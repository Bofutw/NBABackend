var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: false}) );

var cors = require("cors");
app.use(cors());

app.listen(9999);
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("「Ctrl + C」可結束伺服器程式.");

var mysql = require('mysql');
const { application, response } = require("express");
var connection = mysql.createConnection({
	host : '127.0.0.1',
	port : 8889,
	user : 'root',
	password : 'root',
	database : 'nba'
});

connection.connect(function(err) {
	if (err) {
		console.log(JSON.stringify(err));
		return;
	}
});

app.get("/page/:start/:end", function (request, response) {
	var start = parseInt(request.params.start);
	var end = parseInt(request.params.end);
	connection.query('select * from players order by name asc limit ?, ?', 
		[start,end],
		function(err, rows) {
			if (err)	{
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	); 
	})	

	app.get("/chart", function (request, response) {
		connection.query('SELECT team_name as "teamname" ,COUNT(*) as "count"  FROM players GROUP BY team_name;', 
			'',
			function(err, rows) {
				if (err)	{
					console.log(JSON.stringify(err));
					return;
				}
				response.send(JSON.stringify(rows));
			}
		); 
		})	
	
app.get("/players/all", function (request, response) {
	
	connection.query('select * from players', 
		'',
		function(err, rows) {
			if (err)	{
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);  
})

app.get("/search/all/:name", function(request,response){
	var name = request.params.name;
    connection.query("select * from players where name like ?",
	["%"+name+"%"],
    function(error,rows){
		
		if(error){
			console.log(error);
            return;
        }
		response.send(rows);
    })
})

app.get("/players/:teamacronym", function(request,response){
	var teamacronym = request.params.teamacronym;
    connection.query("select * from players where team_acronym = ?",
    [teamacronym],
    function(error,rows){
		
		if(error){
			console.log(error);
            return;
        }
		response.send(rows);
    })
})

app.get("/players/:teamacronym/:name", function(request,response){
	var teamacronym = request.params.teamacronym;
	var name = request.params.name || "";
    connection.query("select * from players where team_acronym = ? and name like ?",
    [teamacronym,"%"+name+"%"],
    function(error,rows){
		if(error){
			console.log(error);
            return;
        }
		response.send(rows);
    })
})