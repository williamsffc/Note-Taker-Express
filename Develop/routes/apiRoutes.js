var notesArray = require("../db/db.json");
var fs = require("fs");

module.exports = function (app) {

    app.get("/api/notes", (req, res) => {
        res.json(notesArray);

    });

    app.post("/api/notes", (req, res) => {

        var saveNote = req.body;

        notesArray.push(saveNote);

        writeToFile("../develop/db/db.json", JSON.stringify(notesArray));

        res.json(notesArray);

        function writeToFile(fileName, data) {
            fs.writeFile(fileName, data, err => {
                if (err) {
                    console.log("Note was not saved!");
                }
                console.log("Saved");
            });
        }
    });

    // DELETE / api / notes /: id - Should receive a query parameter containing the id of a note to delete.This means you'll need to find a way to give each note a unique id when it's saved.In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
    app.delete("/api/notes/:id", (req, res) => {

        var chosen = req.params.id
        
        notesArray.splice(chosen, 1);

        res.json(notesArray);   

        writeToFile("../develop/db/db.json", JSON.stringify(notesArray));

        function writeToFile(fileName, data) {
            fs.writeFile(fileName, data, err => {
                if (err) throw err
            });
        }
        
    });
};