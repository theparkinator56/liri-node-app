
require("dotenv").config();
var fs = require("fs")
var request = require("request");
var moment = require('moment');
var keys = require("./keys");
var Spotify = require('node-spotify-api');
var artist;
var song;
var movie;


exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

var spotify = new Spotify(keys.spotify);
console.log(keys.spotify)

if (process.argv[2] === "concert-this") {
artist = process.argv[3];
var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=trilogy"
    request(URL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var information = JSON.parse(body);
            var date = information[0].datetime
            var randomFormat = "MM/DD/YYYY";
            var convertedDate = moment(date, randomFormat);
        
            console.log(convertedDate);
            console.log(information[0].venue.name);
            console.log(information[0].venue.city);
            console.log(information[0].venue.country);
        }
    });


}
else if (process.argv[2] === "spotify-this-song") {
song = process.argv[3];
spotify.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

  console.log(data.tracks.items[0].album.name); 
  console.log(data.tracks.items[0].artists[0]); 
  console.log(data.tracks.items[0].name); 
  });

}
else if (process.argv[2] === "movie-this") {
movie = process.argv[3];
var URL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"
request(URL, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        var data = JSON.parse(body);

        console.log(data.Title)
        console.log(data.Year)
        console.log(data.Rated)
        console.log(data.Country)
        console.log(data.Ratings)
        console.log(data.Plot)
        console.log(data.Actors)
        console.log(data.Language)

    }
});

}
else if (process.argv[2] === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, song){
        if (error){
            console.log(error)
        }
        console.log(song)
        spotify.search({ type: 'track', query: song }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
        
          console.log(data.tracks.items[0].album.name); 
          console.log(data.tracks.items[0].artists[0]); 
          console.log(data.tracks.items[0].name); 
          });
    })
    
}