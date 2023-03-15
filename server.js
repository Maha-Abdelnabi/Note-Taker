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
const uuid = require('./helper/uuid.js');

const noteData = require("./db/db.json");

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
  const addNote = req.body; //holds parameters that are sent up from the client as part of a POST request, you can access the properties over then url
  addNote.id = uuid();

  noteData.push(addNote);

  const jsonData = JSON.stringify(noteData);

  fs.writeFile("./db/db.json", jsonData, (err) => {
    err ? console.log(err) : res.send(addNote);
  });
});

//delete request
app.delete("/api/notes/:id", (req, res) => {
  let noteList = JSON.parse(fs.readFileSync("./db/db.json"));
  let noteId = req.params.id.toString();

  //filter all notes that does not have matching id and save them as a new array
  //the matching array will be deleted
  noteList = noteList.filter((selected) => {
    return selected.id != noteId;
  });
  //write the updated data to db.json and display the updated note
  fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
  res.json(noteList);
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
