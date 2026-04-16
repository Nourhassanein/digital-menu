import db from "../config/db.js";

export const getCategories = (req, res) => {
  const sql = "SELECT DISTINCT category FROM menu_items";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "DB error", err });
    }

    res.json(results);
  });
};