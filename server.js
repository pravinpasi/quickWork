var express = require('express');
var http = require('http');
var app = express();
var bodyparser = require('body-parser');
var pd = require('./processData');
var util = require('util');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());


app.get('/',function(req,res)
{
    res.end("Server started");
});




/** @description:  Task 1
 * calculate the prime numbers in a given range
 * r1 is lower range r2 is upper range.
 * range validation have not done
 * API will return html page with 3 tables
 * table 1 -> all prime numbers with calculation time in ms
 * table 2 -> all the numbers in the range with their result with calculation time in ms
 * table 3 -> total number of nubers processed with calculation time in ms 
 * @param : r1-> range 1
 * @param : r2-> range 2
 */
app.get('/calculatePrime',function(req,res)
{
    console.log(" calculatePrime ");
    var data;
    if(parseInt(req.query.r2) == parseInt(req.query.r1))
    {
        res.end("Numbers can not be same!!!");
    }
    else
    {
        if(parseInt(req.query.r2) > parseInt(req.query.r1))
        {
            data = pd.getPrimeInRange(parseInt(req.query.r1),parseInt(req.query.r2));
        }
        else
        {
            data = pd.getPrimeInRange(parseInt(req.query.r2),parseInt(req.query.r1));
        }
        
        
        var keys = Object.keys(data);
        var len = keys.length;

        var primeData="<table border='1px'><tr><td>Number</td><td>Time in ms</td></tr>";
        var allData="<table border='1px'><tr><td>Number</td><td>Result</td><td>Time in ms</td></tr>";
        var processData="<table border='1px'><tr><td>Total Numbers Processed</td><td>Time in ms</td></tr>";
        keys.forEach(function(key)
        {
            if(data[key].number != "NA")
            {
                if(data[key].isPrime == "Yes")
                {
                    primeData += "<tr><td>"+data[key].number+"</td><td>"+(data[key].end - data[key].start)+"</td></tr>";
                    allData += "<tr><td>"+data[key].number+"</td><td>Prime</td><td>"+(data[key].end - data[key].start)+"</td></tr>";
                }
                else
                {
                    allData += "<tr><td>"+data[key].number+"</td><td>Normal</td><td>"+(data[key].end - data[key].start)+"</td></tr>";
                }
            }
            else
            {
                let total = parseInt(req.query.r2) - parseInt(req.query.r1);
                console.log("@@ total : " + total);
                processData += "<tr><td>"+(total+1)+"</td><td>"+(data[key].end - data[key].start)+"</td></tr>";
            }
            
            if(--len === 0)
            {
                primeData += "</table>";
                allData += "</table>";
                processData += "</table>";
                var htmlData = "<html><body><h2>Prime Numbers</h2><br>"+primeData+"<br><h2>All Numbers</h2>"+allData+"<br><h2>Over All Result</h2>"+processData+"</body></html>";
                
                res.end(htmlData);
            }    
        });
    }
});


app.listen(8080,function()
{
    console.log("Server Started at 8080");
});
