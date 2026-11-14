const express = require("express");
const router = express.Router();
const db = require("../database");

// GET all stations with optional search
router.get("/", (req, res) => {
	const { q } = req.query;

	if (q && q.trim()) {
		const search = `%${q.trim().toLowerCase()}%`;

		db.all(
			`SELECT * FROM stations
			 WHERE LOWER(name) LIKE ?
			 OR LOWER(cuisine) LIKE ?`,
			[search, search],
			(err, rows) => {
				if (err) {
					return res.status(500).json({
						error: err.message
					});
				}

				if (rows.length === 0) {
					return res.status(200).json({
						message: "Nothing found",
						stations: []
					});
				}

				res.status(200).json(rows);
			}
		);
	} else {
		db.all("SELECT * FROM stations", [], (err, rows) => {
			if (err) {
				return res.status(500).json({
					error: err.message
				});
			}

			res.status(200).json(rows);
		});
	}
});

// POST - Add station
router.post("/", (req, res) => {
	const { name, cuisine } = req.body;

	if (!name || !cuisine) {
		return res.status(400).json({
			error: "Station name and cuisine are required"
		});
	}

	db.run(
		"INSERT INTO stations (name, cuisine) VALUES (?, ?)",
		[name.trim(), cuisine.trim()],
		function (err) {
			if (err) {
				return res.status(400).json({
					error: err.message
				});
			}

			res.status(201).json({
				message: "Station added successfully",
				id: this.lastID
			});
		}
	);
});

// PUT - Update station
router.put("/:id", (req, res) => {
	const { name, cuisine } = req.body;

	if (!name || !cuisine) {
		return res.status(400).json({
			error: "Station name and cuisine are required"
		});
	}

	db.run(
		"UPDATE stations SET name = ?, cuisine = ? WHERE id = ?",
		[name.trim(), cuisine.trim(), req.params.id],
		function (err) {
			if (err) {
				return res.status(400).json({
					error: err.message
				});
			}

			if (this.changes === 0) {
				return res.status(404).json({
					error: "Station not found"
				});
			}

			res.json({
				message: "Station updated successfully"
			});
		}
	);
});

// DELETE - Remove station
router.delete("/:id", (req, res) => {
	db.run(
		"DELETE FROM stations WHERE id = ?",
		[req.params.id],
		function (err) {
			if (err) {
				return res.status(400).json({
					error: err.message
				});
			}

			if (this.changes === 0) {
				return res.status(404).json({
					error: "Station not found"
				});
			}

			res.json({
				message: "Station deleted successfully"
			});
		}
	);
});

module.exports = router;
