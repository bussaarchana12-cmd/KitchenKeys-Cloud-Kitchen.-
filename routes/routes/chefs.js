
const express = require("express");
const router = express.Router();
const db = require("../../database");

// GET all chefs
router.get("/", (req, res) => {
    db.all("SELECT * FROM chefs", [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.status(200).json(rows);
    });
});

// POST - Add a new chef
router.post("/", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: "Name and email are required"
        });
    }

    db.run(
        "INSERT INTO chefs (name, email) VALUES (?, ?)",
        [name, email],
        function (err) {
            if (err) {
                return res.status(400).json({
                    error: err.message
                });
            }

            res.status(201).json({
                message: "Chef added successfully",
                id: this.lastID
            });
        }
    );
});

// PUT - Update chef
router.put("/:id", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: "Name and email are required"
        });
    }

    db.run(
        "UPDATE chefs SET name = ?, email = ? WHERE id = ?",
        [name, email, req.params.id],
        function (err) {
            if (err) {
                return res.status(400).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error: "Chef not found"
                });
            }

            res.status(200).json({
                message: "Chef updated successfully"
            });
        }
    );
});

// DELETE - Remove chef
router.delete("/:id", (req, res) => {
    db.run(
        "DELETE FROM chefs WHERE id = ?",
        [req.params.id],
        function (err) {
            if (err) {
                return res.status(400).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error: "Chef not found"
                });
            }

            res.status(200).json({
                message: "Chef deleted successfully"
            });
        }
    );
});

module.exports = router;

