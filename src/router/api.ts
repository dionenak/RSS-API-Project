import express from "express";
import data, {
	UserInput,
	createRSS,
	updateItems,
} from "../controller/routeController";

const router = express.Router();

router.get("/api", (req, res) => {
	const RSS = createRSS(data.items);
	res.type(".rss").send(RSS);
});

router.post("/api", (req, res) => {
	const userInput: UserInput = {
		title: req.body.title,
		link: req.body.link,
		description: req.body.description,
	};
	if (!userInput.link || !userInput.title || !userInput.description)
		return (
			res
				// `Unprocessable Entity` error code.
				.status(422)
				.send({
					message:
						"Wrong input. Please insert a valid link, title and description.",
				})
		);

	const RSS = updateItems(userInput, data.items);
	res.type(".rss").send(RSS);
});

export default router;
