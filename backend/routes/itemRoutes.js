import express from "express";
import {
  getItems,
  getItemsByCategory,
  searchItems,
  createItem,
  updateItem,
  deleteItem
} from "../controllers/itemController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getItems);
router.get("/filter", getItemsByCategory);
router.get("/search", searchItems);

router.post("/", upload.single("image"), createItem);
router.put("/:id", upload.single("image"), updateItem);
router.delete("/:id", deleteItem);

export default router;