const express = require('express')
const app = express()
const port = 3200
const fs = require('fs')
app.use(express.static('src'))
const bodyParser = require('body-parser');


app.use(bodyParser.json());

app.get('/', (req, res) => res.sendFile(__dirname+ "/src/index.html"))

app.post('/saveMood', (req, res) => {
  const moodValue = req.body.mood;
  fs.appendFile('moods.txt', moodValue + '\n', (err) => {
      if (err) throw err;
      console.log('Mood saved!');
      res.send('Mood saved successfully!');
  });
});


app.listen(port)