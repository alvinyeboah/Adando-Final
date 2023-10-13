const express = require('express')
const app = express()
const port = 3200
app.use(express.static('src'))

app.get('/', (req, res) => res.sendFile(__dirname+ "/src/index.html"))
app.post('/storeMood', (req, res) => {
  const { mood } = req.body;

  const newMood = new Mood({ mood });

  newMood.save((err, mood) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    res.status(200).send('Mood stored successfully');
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))