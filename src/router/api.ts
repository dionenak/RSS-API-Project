import express from "express";
import * as fs from "fs";
import data, { UserInput, updateItems } from "../controller/routeController";

const router = express.Router();

router.get("/api", (req, res) => {
	const RSS = fs.readFileSync("data/output/feed.xml", "utf8");
	res.type(".rss").send(RSS);
});

router.post("/api", (req, res) => {
	const userInput: UserInput = { title: req.body.title, link: req.body.link };
	if (!userInput.link || !userInput.title)
		return (
			res
				// `Unprocessable Entity` error code.
				.status(422)
				.send({ message: "Wrong input. Please insert a valid link and title." })
		);

	const RSS = updateItems(userInput, data.items);
	res.type(".rss").send(RSS);
});

export default router;
