const express = require("express");
const router = express.Router();
const db = require("../db");
const { coachOnly } = require("../middleware/role");

/**
 * POST /scores
 * Add score for an athlete (Coach only)
 */
router.post("/", coachOnly, (req, res) => {
  const athlete_id = req.body?.athlete_id;
  const test_name = req.body?.test_name;
  const value = req.body?.value;

  if (!athlete_id || !test_name || value === undefined) {
    return res.status(400).json({ message: "Missing fields" });
  }

  // Check if test exists
  db.get(
    "SELECT id FROM tests WHERE name = ?",
    [test_name],
    (err, test) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const insertScore = (testId) => {
        db.run(
          "INSERT INTO scores (athlete_id, test_id, value) VALUES (?, ?, ?)",
          [athlete_id, testId, value],
          function (err) {
            if (err) {
              return res.status(500).json({ error: err.message });
            }

            res.json({ id: this.lastID });
          }
        );
      };

      if (!test) {
        // Create test if it does not exist
        db.run(
          "INSERT INTO tests (name) VALUES (?)",
          [test_name],
          function (err) {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            insertScore(this.lastID);
          }
        );
      } else {
        insertScore(test.id);
      }
    }
  );
});

module.exports = router;
