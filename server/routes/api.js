var exec = require('child_process').exec;
var path = require('path');
const express = require('express');
var sleep = require('sleep');
const router = express.Router();
const Record = require('../models/record');


router.get('/update', function(req, res, next) {
  var pa = path.resolve(path.join(__dirname, "/perl/parserWeb.py"));
	var py = exec("python " + pa, function (err,stdout,stderr){
	});
    py.stdout.on("data", function(data) {
        console.log(data.toString());
    });
    py.stderr.on("data", function(data) {
        console.log(data.toString());
    });
  var parse = path.resolve(path.join(__dirname, "perl/parserScript.pl"))
  var parseRun = exec("perl " + parse, function(err,stdout,stderr){
  });
  parseRun.stdout.on("end", function(data) {
        var meta = path.resolve(path.join(__dirname, "perl/MetamapDatastructures.pl"))
        var metaRun = exec("perl " + meta, function(err,stdout,stderr){
        });
        metaRun.stdout.on("data", function(data) {
          console.log(data.toString());
        });
        metaRun.stderr.on("data", function(data) {
          console.log(data.toString());
        });
    });
    parseRun.stderr.on("data", function(data) {
        console.log(data.toString());
    });
	res.send({"work":"Success"});

});

router.get('/inclexcl', (req, res) => {
  var inclu = req.query['incl'];
  var exclu = req.query['excl'];
  var pa = path.resolve(path.join(__dirname, "/perl/inclexcl.py"));
    var py = exec("python " + pa, function (err,stdout,stderr){
    });
    py.stdin.write(JSON.stringify(inclu +";"+ exclu));
    py.stdin.end();
  py.stdout.on('data', function(data){
    dataPrint = data.replace(/\r?\n|\r/g, "");
        if(dataPrint == "done") {
      var pt = path.resolve(path.join(__dirname, "/perl/InclExclParser.pl"));
      var prun = exec("perl " + pt, function(err,stdout,stderr){
      });
      prun.stdout.on('end', function(data){
        var score = path.resolve(path.join(__dirname, "/perl/scorer.pl"));
        var scorerun = exec("perl " + score, function(err,stdout,stderr){});
        scorerun.stdout.on("end", function(data){
          var update = path.resolve(path.join(__dirname, "perl/updateScore.py"));
          var updaterun = exec("python " + update, function(err,stdout,stderr){
          });
          updaterun.stdout.on('end', function(data){
              return res.send({"work":"Success"});
          });
          updaterun.stderr.on('data', function(data){
            console.log(data.toString());
          });
          
        });
        scorerun.stderr.on("data", function(data){
          console.log(data.toString());
        });
      });
      prun.stderr.on('data', function(data){
        console.log(data.toString());
      });
    }
    });
});


router.get('/records', function(req, res, next) {
    Record.find({}).then(function(records) {
        res.send(records);    
    });
});

router.post('/records', function(req, res, next) {
    Record.create(req.body).then(function(record) {
        res.send(record);
    }).catch(next);
});

router.put('/records/:name', function(req, res, next) {
    Record.findOneAndUpdate({name: req.params.name}, req.body).then(function(record) {
        Record.findOne({name: req.params.name}).then(function(record) {
            res.send(record);
        })
    });
});

router.delete('/records/:name', function(req, res, next) {
    Record.findOneAndRemove({name: req.params.name}).then(function(record) {
        res.send(record);
    });
});

module.exports = router;
