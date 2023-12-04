const express = require("express");
const noteRouter = express.Router();
const noteController = require("../controllers/notesController.js");

// Define routes
noteRouter.post("/notes", noteController.addNote);

module.exports = noteRouter;
