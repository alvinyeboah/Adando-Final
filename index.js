const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
app.use(express.static('src'))
const bodyParser = require('body-parser');
const mongoose = require("mongoose")



app.use(bodyParser.json());


app.get('/', (req, res) => res.sendFile(__dirname+ "/src/index.html"))
app.set('view engine','ejs')
mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1",{useNewUrlParser: true,useUnifiedTopology: true } );

const journalSchema = {
  title : String,
  body : String
}
const Journal = mongoose.model('Journal',journalSchema)
app.post('/saveMood', (req, res) => {
  const moodValue = req.body.mood;
  fs.appendFile('moods.txt', moodValue + '\n', (err) => {
      if (err) throw err;
      console.log('Mood saved!');
      res.send('Mood saved successfully!');
  });
});

app.get('/moodData', (req, res) => {
  // Read the local text file
  fs.readFile('moods.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading mood data');
      return;
    }

    // Assuming data is a string with mood values separated by newlines
    const moodData = data.trim().split('\n');
    res.json(moodData);
  });
});

app.listen(port)