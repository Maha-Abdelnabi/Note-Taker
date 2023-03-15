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

//generate unique id
const uuid = require('./helper/uuid');

//body parser gets each request and turn it's data into object
//const bodyParaser = require("body-parser")


//getting db.json to store and retrieve notes using the `fs` module
const noteData = require("./db/db.json");

// Sets up the Express app to handle data parsing..allow to access info coming from forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Static Allows us to reference files with their relative path
app.use(express.static("public"));

// Get request to send the data to the server

//read the `db.json` file and return all saved notes as JSON
app.get("/api/notes", (req, res) => {
  res.json(noteData);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//return notes.htmal
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});


//post request to create new data 
app.post("/api/notes", (req, res) => {
  const addNote = req.body; //holds parameters that are sent up from the client as part of a POST request, you can access the properties over then url
  addNote.id = uuid();

  noteData.push(addNote);

  const jsonData = JSON.stringify(noteData);

  fs.writeFile("./db/db.json", jsonData, (err) => {
    err ? console.log(err) : res.send(addNote);
  });
});

//delete request
app.delete("api/notes/:id", (req, res) => {
  //const id = req.params.id;
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const delNotes = notes.filter((rmvNotes)=> rmvNotes.id !=req.params.id);
  fs.writeFileSync("./db/db.json", JSON.stringify(delNotes));
  res.json(delNotes)
//  let filtered = noteData.filter(function (note) {
//    return note.id != id;
//  });

//  const newNoteData = JSON.stringify(filtered);
//  noteData = filtered;

//  fs.writeFileSync(__dirname + "./db/db.json", newNoteData, (err) => {
//    if (err) throw err;
//  });
});

//return index.html in case the url that added isn't defined
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});


// Server Setup
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
