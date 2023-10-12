const express = require('express');
const app = express();
const passport = require('passport');
const User = require('../models/User');
const path = require('path');

// Register Route
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});



// Login Route
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});




// Register Route
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });

  User.register(newUser, password, (err, user) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }
    passport.authenticate('local')(req, res, () => {
      res.json({ success: true, user });
    });
  });
});

// Login Route
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ success: true, user: req.user });
});

// Logout Route
app.get('/logout', (req, res) => {
  req.logout();
  res.json({ success: true });
});

module.exports = app;
