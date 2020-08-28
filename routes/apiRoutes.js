var noteArray = require("../db/db.json");
var fs = require("fs");
const path = require("path")
var uuidv1 = require('uuidv1');

module.exports = function (app) {

    app.get("/api/notes", (req, res) => {
        res.json(noteArray);

    });

    app.post("/api/notes", (req, res) => {

        var saveNote = req.body;

        saveNote.id = uuidv1();

        noteArray.push(saveNote);
        console.log(noteArray);
        fs.writeFile("db/db.json", JSON.stringify(noteArray), (err) => {
            if (err) throw err;
            console.log("Saved")
        })

        res.json(noteArray);

        // async function writeToFile(fileName, data) {
        //     await fs.writeFile(fileName, data, err => {
        //         if (err) {
        //             console.log("Note was not saved!");
        //         }
        //         console.log("Saved");
        
        //     });
        // }
    });

    // DELETE / api / notes /: id - Should receive a query parameter containing the id of a note to delete.This means you'll need to find a way to give each note a unique id when it's saved.In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
    app.delete("/api/notes/:id", (req, res) => {

        var chosen = req.params.id
        console.log(chosen);

        var filterArr = [];

        for (let i = 0; i < noteArray.length; i++) {
            if (noteArray[i].id !== chosen) {
                filterArr.push(noteArray[i])
            }
        }

        res.json(filterArr);   
        // re-write to array what's left of the notes
        writeToFile("db/db.json", JSON.stringify(filterArr));

        function writeToFile(fileName, data) {
            fs.writeFile(fileName, data, err => {
                if (err) throw err
            });
        }
        
    });
};