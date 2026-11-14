
const express = require("express");
const router = express.Router();
const db = require("../../database");

// GET all stations
router.get("/", (req, res) => {
    db.all("SELECT * FROM stations", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// GET station by ID
router.get("/:id", (req, res) => {
    db.get(
        "SELECT * FROM stations WHERE id = ?",
        [req.params.id],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!row) {
                return res.status(404).json({ message: "Station not found" });
            }
            res.json(row);
        }
    );
});

// CREATE station
router.post("/", (req, res) => {
    const { name, cuisine } = req.body;

    if (!name || !cuisine) {
        return res.status(400).json({
            message: "Name and cuisine are required"
        });
    }

    db.run(
        "INSERT INTO stations (name, cuisine) VALUES (?, ?)",
        [name, cuisine],
        function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(201).json({
                message: "Station created successfully",
                id: this.lastID
            });
        }
    );
});

// UPDATE station
router.put("/:id", (req, res) => {
    const { name, cuisine } = req.body;

    if (!name || !cuisine) {
        return res.status(400).json({
            message: "Name and cuisine are required"
        });
    }

    db.run(
        "UPDATE stations SET name = ?, cuisine = ? WHERE id = ?",
        [name, cuisine, req.params.id],
        function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: "Station not found" });
            }
            res.json({ message: "Station updated successfully" });
        }
    );
});

// DELETE station
router.delete("/:id", (req, res) => {
    db.run(
        "DELETE FROM stations WHERE id = ?",
        [req.params.id],
        function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: "Station not found" });
            }
            res.json({ message: "Station deleted successfully" });
        }
    );
});

module.exports = router;
