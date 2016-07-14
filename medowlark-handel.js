var express = require('express');
var app = express();
app.set('port',process.env.PORT|| 3000);
var handle = require('express-handlebars')
				.create({defaultLayout : 'main'});

var fortunes = ['hey','fuck off','express seeds have been planted','Yo to Metal',];


app.engine('handlebars',handle.engine);
app.set('view engine','handlebars');

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
	res.render('home');
});

app.get('/about',function(req,res){
	var randomFor = fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about',{fortune :randomFor});
});

app.use(function(req,res,next){
	res.status(404);
	res.render('404');
});

app.use(function(err,req,res,next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on ' + app.get('port'));
});