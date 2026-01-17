const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * GET /leaderboard
 * Returns athletes ranked by total performance score
 */
router.get("/", (req, res) => {
  const query = `
    SELECT 
      a.id,
      a.name,
      a.sport,
      SUM(
        CASE 
          WHEN t.name = '30m Sprint' THEN (100 - s.value * 10)
          WHEN t.name = 'Vertical Jump' THEN (s.value * 2)
          ELSE s.value
        END
      ) AS total_score
    FROM athletes a
    JOIN scores s ON a.id = s.athlete_id
    JOIN tests t ON s.test_id = t.id
    GROUP BY a.id
    ORDER BY total_score DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(rows);
  });
});

module.exports = router;
