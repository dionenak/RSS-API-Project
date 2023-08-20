import config from "config";
import xml from "xml";
import * as fs from "fs";

export type UserInput = { title: string; link: string };
type dataType = { ["items"]: Array<UserInput> };
const data: dataType = {
	items: [],
};

function createRSS(items: Array<UserInput>): string {
	/**
	 * Info we want from config for our XML.
	 */
	const projectInfo: {
		title: string;
		link: string;
		description: string;
		lang: "string";
	} = config.get("project");

	/**
	 * Constructing the XML object.
	 */
	const xmlObject = {
		rss: [
			{
				_attr: {
					version: config.get("rss.version"),
				},
			},
			{
				channel: [
					{ title: projectInfo.title },
					{ link: projectInfo.link },
					{ description: projectInfo.description },
					{ language: projectInfo.lang },

					...items.map((item) => {
						return {
							item: [{ title: item.title }, { link: item.link }],
						};
					}),
				],
			},
		],
	};

	const xmlString =
		'<?xml version="1.0" encoding="UTF-8"?>' + xml(xmlObject, { indent: "  " });

	return xmlString;
}

export function updateItems(userInput: UserInput, RSSinput: Array<UserInput>) {
	let foundItem = false;
	let foundLink = false;

	for (const item of RSSinput) {
		if (item.title === userInput.title) {
			item.link = userInput.link;
			foundItem = true;
			break;
		}
		// 3. mallon urls den exoume dipla. ama iparxei to kanei skip.
		if (item.link === userInput.link) {
			foundLink = true;
			break;
		}
	}
	// Isws edw na girna to RSS?
	if (!foundLink) return;
	if (!foundItem) {
		RSSinput.push({ title: userInput.title, link: userInput.link });
	}
	const RSS = createRSS(RSSinput);
	fs.writeFileSync("data/output/feed.xml", RSS);
	return RSS;
}

export default data;
