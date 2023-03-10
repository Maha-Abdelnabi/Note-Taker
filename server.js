// Requiring express.js
const express = require("express");

// Changing the module to object to use its inbuilt functions
const app = express();

// Port number to run the port
const PORT = process.env.PORT || 3001;

// Get request to send the data to the server
app.get("/", (req, res) => {
  res.send("welcome to express");
});

// Server Setup
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
