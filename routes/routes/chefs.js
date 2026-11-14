
const express = require("express");
const router = express.Router();
const db = require("../../database");

// GET all chefs
router.get("/", (req, res) => {
    db.all("SELECT * FROM chefs", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// GET chef by ID
router.get("/:id", (req, res) => {
    db.get(
        "SELECT * FROM chefs WHERE id = ?",
        [req.params.id],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!row) {
                return res.status(404).json({ message: "Chef not found" });
            }
            res.json(row);
        }
    );
});

// CREATE chef
router.post("/", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required"
        });
    }

    db.run(
        "INSERT INTO chefs (name, email) VALUES (?, ?)",
        [name, email],
        function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(201).json({
                message: "Chef created successfully",
                id: this.lastID
            });
        }
    );
});

// UPDATE chef
router.put("/:id", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required"
        });
    }

    db.run(
        "UPDATE chefs SET name = ?, email = ? WHERE id = ?",
        [name, email, req.params.id],
        function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: "Chef not found" });
            }
            res.json({ message: "Chef updated successfully" });
        }
    );
});

// DELETE chef
router.delete("/:id", (req, res) => {
    db.run(
        "DELETE FROM chefs WHERE id = ?",
        [req.params.id],
        function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: "Chef not found" });
            }
            res.json({ message: "Chef deleted successfully" });
        }
    );
});

module.exports = router;
