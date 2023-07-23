import express from "express";
import * as fs from "fs";
import * as data from "../../data/input/data.json";
import { UserInput, updateItems } from "../controller/routeController";

const router = express.Router();

router.get("/api", (req, res) => {
	const RSS = fs.readFileSync("data/output/feed.xml", "utf8");
	res.type(".rss").send(RSS);
});

router.post("/api", (req, res) => {
	const userInput: UserInput = { title: req.body.title, link: req.body.link };
	// 1. na kanoume save sto data.
	// 2. return ena diko mas response kai thelw ena statuscode.
	if (!userInput.link || !userInput.title)
		throw new Error("Please provide a valid title and link.");

	const RSS = updateItems(userInput, data.items);
	res.type(".rss").send(RSS);
});

export default router;
