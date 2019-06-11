// // let request = require('request');
// // const argv = require('yargs').argv;

// // let apiKey = '815045867b8c69ed1a55112b942b5b10';
// // let city = 'washington' || argv.c;
// // let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

// // request(url, function (err, response, body) {
// //   if(err){
// //     console.log('error:', error);
// //   } else {
// //     let weather = JSON.parse(body)
// //     let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
// //     console.log(message);
// //   }
// // });


// 'use strict';

// const express = require('express');
// const bodyParser = require('body-parser');
// const http = require('http');
// const API_KEY = require('./apiKey');

// const server = express();
// server.use(bodyParser.urlencoded({
//     extended: true
// }));

// server.use(bodyParser.json());

// server.post('/getWeather', (req, res) => {

//     const weatherDetails= req.body.result && req.body.result.parameters && req.body.result.parameters.weather;
//     //const reqUrl = encodeURI(`http://www.omdbapi.com/?t=${weatherDetails}&apikey=${API_KEY}`);
//     const reqUrl = encodeURI(`http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}`);

//     http.get(reqUrl, (responseFromAPI) => {
//         let completeResponse = '';
//         responseFromAPI.on('data', (chunk) => {
//             completeResponse += chunk;
//         });
//         responseFromAPI.on('end', () => {
//             const weather = JSON.parse(completeResponse);
//             let dataToSend = weatherDetails === 'The Godfather' ? `I don't have the required info on that. Here's some info on 'The Godfather' instead.\n` : '';
//             dataToSend += `${weather.Title} is a ${weather.Actors}`;
//             return res.json({
//                 //speech: dataToSend,
//                 displayText: dataToSend,
//                 //source: 'get-movie-details'
//             });
//         });
//     }, (error) => {
//         return res.json({
//             //speech: 'Something went wrong!',
//             displayText: 'Something went wrong!',
//             //source: 'get-movie-details'
//         });
//     });
// });

// server.listen((process.env.PORT || 8000), () => {
//     console.log("Server is up and running...");
// });

//===========

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const API_KEY = require('./apiKey');

const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/get-movie-details', (req, res) => {

    const movieToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.movie ? req.body.result.parameters.movie : 'The Godfather';
    const reqUrl = encodeURI(`http://www.omdbapi.com/?t=${movieToSearch}&apikey=${API_KEY}`);
    http.get(reqUrl, (responseFromAPI) => {
        let completeResponse = '';
        responseFromAPI.on('data', (chunk) => {
            completeResponse += chunk;
        });
        responseFromAPI.on('end', () => {
            const movie = JSON.parse(completeResponse);
            let dataToSend = movieToSearch === 'The Godfather' ? `I don't have the required info on that. Here's some info on 'The Godfather' instead.\n` : '';
            dataToSend += `${movie.Title} is a ${movie.Actors} starer ${movie.Genre} movie, released in ${movie.Year}. It was directed by ${movie.Director}`;

            return res.json({
                //speech: dataToSend,
                displayText: dataToSend,
                //source: 'get-movie-details'
            });
        });
    }, (error) => {
        return res.json({
            //speech: 'Something went wrong!',
            displayText: 'Something went wrong!',
            //source: 'get-movie-details'
        });
    });
});

server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});