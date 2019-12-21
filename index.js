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


app.post('/command', function (req, res) {
    console.log(req.body)
    let commands = req.body.command.split(' ')

    try {
        res.json({
            "response": spawn(commands.slice(1), commands).stdout.toString()
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