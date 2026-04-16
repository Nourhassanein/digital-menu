import db from "../config/db.js";

export const getItems = (req, res) => {
  db.query("SELECT * FROM menu_items", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
export const getItemsByCategory = (req, res) => {
  const { category } = req.query;

  const sql = category
    ? "SELECT * FROM menu_items WHERE category = ?"
    : "SELECT * FROM menu_items";

  db.query(sql, category ? [category] : [], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
export const searchItems = (req, res) => {
  const { q } = req.query;

  db.query(
    "SELECT * FROM menu_items WHERE name LIKE ?",
    [`%${q || ""}%`],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
};

export const createItem = (req, res) => {
  const { name, description, price, category, rating, badge, tag } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO menu_items 
    (name, description, price, category, image, rating, badge, tag)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, description, price, category, image, rating, badge, tag],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Item created" });
    }
  );
};

export const updateItem = (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, rating, badge, tag } = req.body;

  const image = req.file ? req.file.filename : req.body.image;

  const sql = `
    UPDATE menu_items SET
    name=?, description=?, price=?, category=?, image=?, rating=?, badge=?, tag=?
    WHERE id=?
  `;

  db.query(
    sql,
    [name, description, price, category, image, rating, badge, tag, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Item updated" });
    }
  );
};

export const deleteItem = (req, res) => {
  db.query("DELETE FROM menu_items WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Item deleted" });
  });
};