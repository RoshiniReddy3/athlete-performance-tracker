const express = require("express");
const router = express.Router();
const db = require("../db");
const { coachOnly } = require("../middleware/role");

/**
 * POST /athletes
 * Create a new athlete (Coach only)
 */
router.post("/", coachOnly, (req, res) => {
  const { name, age, sport } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const query = `
    INSERT INTO athletes (name, age, sport)
    VALUES (?, ?, ?)
  `;

  db.run(query, [name, age, sport], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({
      id: this.lastID,
      name,
      age,
      sport,
    });
  });
});

/**
 * GET /athletes
 * Get all athletes (Coach + Viewer)
 */
router.get("/", (req, res) => {
  db.all("SELECT * FROM athletes", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

/**
 * PUT /athletes/:id
 * Update athlete (Coach only)
 */
router.put("/:id", coachOnly, (req, res) => {
  const { name, age, sport } = req.body;
  const { id } = req.params;

  const query = `
    UPDATE athletes
    SET name = ?, age = ?, sport = ?
    WHERE id = ?
  `;

  db.run(query, [name, age, sport, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: "Athlete not found" });
    }

    res.json({ message: "Athlete updated successfully" });
  });
});

/**
 * DELETE /athletes/:id
 * Delete athlete and related scores (Coach only)
 */
router.delete("/:id", coachOnly, (req, res) => {
  const { id } = req.params;

  // First delete related scores
  db.run(
    "DELETE FROM scores WHERE athlete_id = ?",
    [id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Then delete athlete
      db.run(
        "DELETE FROM athletes WHERE id = ?",
        [id],
        function (err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          if (this.changes === 0) {
            return res.status(404).json({ message: "Athlete not found" });
          }

          res.json({
            message: "Athlete and related scores deleted successfully",
          });
        }
      );
    }
  );
});

module.exports = router;
