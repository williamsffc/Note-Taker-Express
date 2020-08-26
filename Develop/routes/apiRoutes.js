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
                    console.log("Noted was not saved!");
                }
                console.log("Saved");
            });
        }
    });

    

};