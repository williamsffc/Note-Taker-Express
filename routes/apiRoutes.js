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

        // function writeToFile(fileName, data) {
        //     fs.writeFile(fileName, data, err => {
        //         if (err) {
        //             console.log("Note was not saved!");
        //         }
        //         console.log("Saved");
        
        //     });
        // }
    });

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
        writeToFile("..db/db.json", JSON.stringify(filterArr));

        function writeToFile(fileName, data) {
            fs.writeFile(fileName, data, err => {
                if (err) throw err
            });
        }
        
    });
};