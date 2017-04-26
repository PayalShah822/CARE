var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');
const express = require('express');
var multer = require('multer');
var DIR = './routes/perl/xml';
const router = express.Router();
const Record = require('../models/record');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR)
  },
  filename: function (req, file, cb) {
    console.log(file.mimetype);
    cb(null, file.originalname) //Appending extension
  }
});

var upload = multer({storage: storage}).array('file',50);

router.post('/upload', function(req, res, next) {
  upload(req, res, function(err) {
    if (err){
      console.log(err.toString());
      return res.end("Error uploading file");
    }
    res.end("File uploaded!");
  });
});


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
  py.stdout.on('end', function(data){
      var pt = path.resolve(path.join(__dirname, "/perl/inclExclParser.py"));
      var prun = exec("python " + pt, function(err,stdout,stderr){
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
          updaterun.stdout.on("data", function(data) {
            console.log(data.toString());
          })
          
        });
        scorerun.stderr.on("data", function(data){
          console.log(data.toString());
        });
      });
      prun.stdout.on("data", function(data){
        console.log(data.toString());
      })
      prun.stderr.on('data', function(data){
        console.log(data.toString());
      });
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
    console.log(req.params.name);
    var directory = DIR + "/";
    var file = directory + req.params.name + ".xml";
    fs.stat(file, function (err, stats) {
    console.log(stats);//here we got all information of file in stats variable
      if (err) {
        console.log(err);
      }
      fs.unlink(file,function(err){
        if(err) console.log(err);
        console.log('file deleted successfully');
        Record.findOneAndRemove({name: req.params.name}).then(function(record) {
          res.send(record);
        });
      });  
    });
});

module.exports = router;
