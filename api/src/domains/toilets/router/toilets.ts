import express from "express";
const router = express.Router();
import {
  insertToilets,
  createToilet,
  getToilets,
  getNearbyToilets,
} from "../data-access/toilet";

router.route("/").get(getToilets).post(insertToilets);
router.route("/nearby").get(getNearbyToilets);

export default router;
