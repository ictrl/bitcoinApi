const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    // res.send("hi baby! ❤❤");
    res.sendFile(__dirname +"/index.html");
});

app.post("/",function(req, res){  
    var crypto = req.body.crypto; 
    var fiat = req.body.fiat; 
    var amount = req.body.amount;

    var options= {
        url : "https://apiv2.bitcoinaverage.com/convert/global",
        method : 'get',
        qs : {
            from : crypto,
            to : fiat,
            amount : amount
        }
    };

    request(options, function(error , response, body){
        var parseBody = JSON.parse(body);
        var value = parseBody.price;
        var time = parseBody.time;

        res.write("<h1> " + amount + crypto + " is currently worth " + value + " " + fiat + "</h1>");
        res.write("<p> The Current Time is " + time + "</p>");
        res.send();
    });
});

app.listen(3000,function(){
    console.log("SERVER IS RUNNING ON PORT 3000");
});