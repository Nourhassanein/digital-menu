import db from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  db.query(
    "SELECT * FROM admins WHERE username=?",
    [username],
    async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const valid = await bcrypt.compare(password, result[0].password);

      if (!valid) {
        return res.status(401).json({ message: "Wrong password" });
      }

      const token = jwt.sign(
        { id: result[0].id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ token });
    }
  );
};