const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

// IMPORTANT: Enable foreign keys
db.run("PRAGMA foreign_keys = ON");

// Create tables
db.serialize(() => {
  // Athletes table
  db.run(`
    CREATE TABLE IF NOT EXISTS athletes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER,
      sport TEXT
    )
  `);

  // Tests table
  db.run(`
    CREATE TABLE IF NOT EXISTS tests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )
  `);

  // Scores table
  db.run(`
    CREATE TABLE IF NOT EXISTS scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      athlete_id INTEGER NOT NULL,
      test_id INTEGER NOT NULL,
      value REAL NOT NULL,
      FOREIGN KEY (athlete_id) REFERENCES athletes(id),
      FOREIGN KEY (test_id) REFERENCES tests(id)
    )
  `);
});

module.exports = db;
