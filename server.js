// Requiring express.js
const express = require("express");

const app = express();

//fs provides functions that you can use to read and write data in JSON format
const fs = require("fs");

//path module has join property that combine all the paths in one path that match the operating system that you work on
const path = require ("path");

// Port number to run the port
const PORT = process.env.PORT || 3001;

//generate unique id
const uuid = require('./helper/uuid');



// Sets up the Express Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Static Allows us to reference files with their relative path
app.use(express.static("public"));



//return all saved notes as JSON..in db.json
app.get("/api/notes", (req, res) => {
res.sendFile(path.join(__dirname, "/db/db.json"));
});





//post request to create new data 
app.post("/api/notes", (req, res) => {
   const addNotes = JSON.parse(fs.readFileSync("./db/db.json"));
   const newNotes = req.body;
   newNotes.id = uuid;
   addNotes.push(newNotes);
   fs.writeFileSync("./db/db.json", JSON.stringify(addNotes));
   res.json(addNotes);
});

//delete request
app.delete("api/notes/:id", (req, res) => {
  
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const delNotes = notes.filter((removeNotes)=> removeNotes.id !=req.params.id);
  fs.writeFileSync("./db/db.json", JSON.stringify(delNotes));
  res.json(delNotes)
});

// Get request to send the data to the server
//return index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//return notes.htmal
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
//return index.html in case the url that added isn't defined
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});


// Server Setup
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
