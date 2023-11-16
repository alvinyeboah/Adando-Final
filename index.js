const express = require("express");
const app = express();
const port = 3001;
const fs = require("fs");
app.use(express.static("src"));
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");

app.use(bodyParser.json());

app.get("/", (req, res) => res.sendFile(__dirname + "/src/index.html"));
// app.set("view engine", "ejs");
// mongoose.connect(
//   "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1",
//   { useNewUrlParser: true, useUnifiedTopology: true }
// );

const journalSchema = {
  title: String,
  body: String,
};
// const Journal = mongoose.model("Journal", journalSchema);

app.post("/moodData", (req, res) => {
  const moodValue = req.body;
  fs.appendFile("moods.txt", moodValue + "\n", (err) => {
    if (err) throw err;
    console.log("Mood saved!");
    res.send("Mood saved successfully!");
  });
});

app.get('/home', async (req, res) => {
  try {
    const journals = await Journal.find({});
    res.render('home', { journals });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// app.get("/compose", (req, res) => {
//   res.render("compose");
// });

// app.get("/about", (req, res) => {
//   res.render("about");
// });

// app.get("/contact", (req, res) => {
//   res.render("contact");
// });

// app.post("/compose", (req, res) => {
//   const journal = new Journal({
//     title: req.body.title,
//     body: req.body.body,
//   });
//   journal.save((err) => {
//     if (!err) {
//       res.redirect("/home");
//     }
//   });
// });

// app.get("/journals/:title", (req, res) => {
//   const t = req.params.title;
//   Journal.findOne({ _id: t }, (err, journal) => {
//     res.render("params", { title: journal.title, body: journal.body });
//   });
// });

app.post("/saveMoodData", (req, res) => {
  const moodData = req.body;

  fs.appendFile("moods.txt", moodData, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving mood data");
      return;
    }
    res.send("Data saved successfully");
  });
});

app.listen(port, () => {
  console.log(port);
});

