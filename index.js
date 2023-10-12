const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/node_auth'
  );

// Set up express-session
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Set up routes
app.use("/auth", require("./routes/auth"));

app.use(express.static("src"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
