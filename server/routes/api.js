var exec = require('child_process').exec;
var path = require('path');
const express = require('express');
const router = express.Router();
var dataPrint = "";

/* GET api listing. */
router.get('/inclexcl', (req, res) => {
  var inclu = req.param('incl');
  var exclu = req.param('excl');
  var pa = path.resolve(path.join(__dirname, "/perl/test.py"));
	var py = exec("python " + pa, function (err,stdout,stderr){
	});
	py.stdin.write(JSON.stringify(inclu +";"+ exclu));
	py.stdin.end();
  py.stdout.on('data', function(data){
    dataPrint = data.replace(/\r?\n|\r/g, "");
		if(dataPrint == "done") {
      var pt = path.resolve(path.join(__dirname, "/perl/perlPrint.pl"));
      var prun = exec("perl " + pt, function(err,stdout,stderr){
      });
      prun.stdout.on('data', function(data){
        res.send(data.toString());
      });
    }
	});
});

module.exports = router;
