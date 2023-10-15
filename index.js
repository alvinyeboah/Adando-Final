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
const api_url = "https://type.fit/api/quotes";

        async function getapi(url) {
            const response = await fetch(url);
            var data = await response.json();
            displayData(data);
        }

        function displayData(data) {
            const quoteContainer = document.getElementById("quote-container");
            data.forEach(quote => {
                const quoteElement = document.createElement("p");
                quoteElement.textContent = `"${quote.text}" - ${quote.author}`;
                quoteContainer.appendChild(quoteElement);
            });
        }

app.listen(port)