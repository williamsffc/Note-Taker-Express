var notesArray = require("../db/db.json");



module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        res.json(notesArray);

    });

    //POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.

    app.post("/api/notes", function (req, res) {
        var saveNote = req.body;
        
        characters.push(saveNote);
        console.log(notesArray);
        res.json(notesArray);
    });

};