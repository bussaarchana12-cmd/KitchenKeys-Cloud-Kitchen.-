
const express = require("express");
const router = express.Router();
const db = require("../../database");

// GET all bookings
router.get("/", (req, res) => {
    db.all("SELECT * FROM bookings", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// GET booking by ID
router.get("/:id", (req, res) => {
    db.get(
        "SELECT * FROM bookings WHERE id = ?",
        [req.params.id],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!row) {
                return res.status(404).json({ message: "Booking not found" });
            }
            res.json(row);
        }
    );
});

// CREATE booking
router.post("/", (req, res) => {
    const { chef_id, station_id, booking_date, status } = req.body;

    if (!chef_id || !station_id || !booking_date) {
        return res.status(400).json({
            message: "chef_id, station_id and booking_date are required"
        });
    }

    db.run(
        `INSERT INTO bookings (chef_id, station_id, booking_date, status)
         VALUES (?, ?, ?, ?)`,
        [chef_id, station_id, booking_date, status || "pending"],
        function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(201).json({
                message: "Booking created successfully",
                id: this.lastID
            });
        }
    );
});

// UPDATE booking status
router.put("/:id", (req, res) => {
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({
            message: "Status is required"
        });
    }

    db.run(
        "UPDATE bookings SET status = ? WHERE id = ?",
        [status, req.params.id],
        function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: "Booking not found" });
            }
            res.json({ message: "Booking updated successfully" });
        }
    );
});

// DELETE booking
router.delete("/:id", (req, res) => {
    db.run(
        "DELETE FROM bookings WHERE id = ?",
        [req.params.id],
        function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: "Booking not found" });
            }
            res.json({ message: "Booking deleted successfully" });
        }
    );
});

module.exports = router;
