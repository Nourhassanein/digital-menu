import db from "../config/db.js";

// CREATE ORDER
export const createOrder = (req, res) => {
  const { customer, total } = req.body;

  if (!customer || !total) {
    return res.status(400).json({ message: "Missing data" });
  }

  const sql =
    "INSERT INTO orders (customer, total, status) VALUES (?, ?, 'Pending')";

  db.query(sql, [customer, total], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json({
      message: "Order created",
      orderId: result.insertId,
    });
  });
};

// GET ORDERS
export const getOrders = (req, res) => {
  db.query("SELECT * FROM orders ORDER BY id DESC", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
};

// UPDATE ORDER STATUS
export const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const status = req.body?.status;

  if (!id || !status) {
    return res.status(400).json({ message: "Missing data" });
  }

  const sql = "UPDATE orders SET status = ? WHERE id = ?";

  db.query(sql, [status, id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json({ message: "Status updated" });
  });
};