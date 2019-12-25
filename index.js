var express = require('express');
var spawn = require('child_process').spawnSync;
var app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('public'));

app.get('/photos', function (req, res) {
  res.json([{
      "hello": "word"
  }]);
});


app.post('/photo', function (req, res) {
    try {
        if (req.body.flash){
          spawn("termux-torch", ["on"])
        }
        setTimeout(() => {
          res.json({
            "response": spawn("termux-camera-photo", ["-c", "0", "public/mifoto.jpg"] ).stdout.toString()
          });
          setTimeout(() => {
            if (req.body.flash){
              spawn("termux-torch", ["off"])
            }
          }, 1000)
        }, 1000)
        
        
    } catch (e){
        res.json({
            "response": e.message
        });
    }
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});