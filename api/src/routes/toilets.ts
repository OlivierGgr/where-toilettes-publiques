import express from "express";
const router = express.Router();
import {
  insertToilets,
  createToilet,
  getToilets,
  getNearbyToilets,
} from "../controllers/toilet";

router.route("/").get(getToilets).post(insertToilets);
router.route("/nearby").get(getNearbyToilets);

module.exports = router;
