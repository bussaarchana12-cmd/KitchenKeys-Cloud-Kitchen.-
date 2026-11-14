
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

// Create database folder
const dbFolder = path.join(__dirname, "database");

if (!fs.existsSync(dbFolder)) {
    fs.mkdirSync(dbFolder, { recursive: true });
}

// Database file path
const dbPath = path.join(dbFolder, "kitchen.db");

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Connected to KitchenKeys database!");
    }
});

// Create tables
db.serialize(() => {
    db.run("PRAGMA foreign_keys = ON");

    db.run(`
        CREATE TABLE IF NOT EXISTS chefs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS stations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            cuisine TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            chef_id INTEGER NOT NULL,
            station_id INTEGER NOT NULL,
            booking_date TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'pending',
            FOREIGN KEY (chef_id) REFERENCES chefs(id),
            FOREIGN KEY (station_id) REFERENCES stations(id)
        )
    `);

    console.log("KitchenKeys tables are ready!");
});

module.exports = db;
