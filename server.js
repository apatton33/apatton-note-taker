const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');
const customNotes = require('./db/db.json')

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
});

app.get('/api/notes', (req, res) => {
  res.json(customNotes);
});


app.post('/api/notes', (req, res) => {
  let userNote = req.body;
      userNote.id = uniqid();
      customNotes.push(userNote);
  fs.writeFile('./db/db.json', JSON.stringify(customNotes, null, 4) , (err) => {
            err ? console.log(err) : res.send(userNote)
        })
  
});

app.delete("/api/notes/:id", function(req, res) {
  customNotes.splice(req.params.id, 1);
  updateDb();
});


app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);



app.listen(PORT, () => {
    console.log(`App Listening at http://localHost:${PORT}`);
});