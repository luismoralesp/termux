var express = require('express');
var spawn = require('child_process').spawnSync;
var app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('public'));

app.post('/lamp', function (req, res) {
  try {
    res.json([{
        "hello": spawn("termux-torch", [req.body.mode]).stdout.toString()
    }]);
  } catch (e){
    res.json({
        "response": e.message
    });
  }
});


app.post('/photo', function (req, res) {
    try {
        res.json({
          "response": spawn("termux-camera-photo", ["-c", req.body.cam, "public/mifoto.jpg"] ).stdout.toString()
        });        
    } catch (e){
        res.json({
            "response": e.message
        });
    }
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});