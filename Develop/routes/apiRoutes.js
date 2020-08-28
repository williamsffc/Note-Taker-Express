var activeNote = require("../db/db.json");
var fs = require("fs");

module.exports = function (app) {

    app.get("/api/notes", (req, res) => {
        res.json(activeNote);

    });

    app.post("/api/notes", (req, res) => {

        var saveNote = req.body;

        activeNote.push(saveNote);

        writeToFile("../develop/db/db.json", JSON.stringify(activeNote));

        res.json(activeNote);

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
        
        activeNote.splice(chosen, 1);

        res.json(activeNote);   
        // re-write to array what's left of the notes
        writeToFile("../develop/db/db.json", JSON.stringify(activeNote));

        function writeToFile(fileName, data) {
            fs.writeFile(fileName, data, err => {
                if (err) throw err
            });
        }
        
    });
};