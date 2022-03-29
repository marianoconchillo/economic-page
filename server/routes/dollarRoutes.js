import express from "express";
import { query, validationResult } from 'express-validator';
import { getDolarBlue, getEvolucionDolarBlue } from "../controllers/dollarController.js";

const router = express.Router();

router.get("/", getDolarBlue);
router.get(
    "/historical", 
    [query('limit').isInt({ min: 0, max: 100 }),
    query('from').isInt({ min: 0, max: 31 })],
    getEvolucionDolarBlue);

export default router;