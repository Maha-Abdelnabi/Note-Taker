// Requiring express.js
const express = require("express");

// Changing the module to object to use its inbuilt functions
const app = express();

//fs provides functions that you can use to read and write data in JSON format
const fs = require("fs");

//path module has join property that combine all the paths in one path that match the operating system that you work on
const path = require ("path");

// Port number to run the port
const PORT = process.env.PORT || 3001;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Static Allows us to reference files with their relative path
app.use(express.static("public"));

// Get request to send the data to the server
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});


// Server Setup
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
