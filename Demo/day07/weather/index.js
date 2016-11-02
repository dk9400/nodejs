var express = require('express');
var handlebars = require('express3-handlebars')
		.create({defaultLayout:'main',
				helpers:{
					section: function(name, options){
						if(!this._sections) this._sections = {};
						this._sections[name] = options.fn(this);
						return null;
					}				
				}
	});

var app = express();

app.set('port', process.env.PORT || 3000);

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
	res.render('home');
});

app.get('/nursery-rhyme', function(req, res){
	res.render('nursery-rhyme');
});

app.get('/data/nursery-rhyme', function(req, res){
	res.json({
		animal:'squirrel',
		bodyPart:'tail',
		adjective:'bushy',
		noun:'heck'
	});
});


function getWeatherData(){
return {
locations: [
{
name: 'Portland',
forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
weather: 'Overcast',
temp: '54.1 F (12.3 C)',
},
{
name: 'Bend',
forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
weather: 'Partly Cloudy',
temp: '55.0 F (12.8 C)',
},
{
name: 'Manzanita',
forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
weather: 'Light Rain',
temp: '55.0 F (12.8 C)',
},
],
};
};

app.use(function(req, res, next){
if(!res.locals.partials) res.locals.partials = {};
res.locals.partials.weather = getWeatherData();
next();
});




app.use(function(req, res, next){
	res.status(404);
});


app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
});


app.listen(app.get('port'));