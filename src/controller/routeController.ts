import config from "config";
import xml from "xml";
import * as fs from "fs";

export type UserInput = { title: string; link: string };
type dataType = { ["items"]: Array<UserInput> };
const data: dataType = {
	items: [],
};

function instantiateRSS() {
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

	//TODO finish the type
	// interface xmlObjectType {
	// 	rss: [
	// 		{ _attr: { version: number } },
	// 		channel: {
	// 			title: string;
	// 			link: string;
	// 			description: string;
	// 			language: string;
	// 		}
	// 	];
	// }

	const initialXmlObject: any = {
		rss: [
			{
				_attr: {
					version: config.get<number>("rss.version"),
				},
			},
			{
				channel: [
					{ title: projectInfo.title },
					{ link: projectInfo.link },
					{ description: projectInfo.description },
					{ language: projectInfo.lang },
				],
			},
		],
	};

	return initialXmlObject;
}

function createRSS(items: Array<UserInput>): string {
	let xmlObject = instantiateRSS();

	data.items.forEach((item) => {
		xmlObject.rss[1].channel!.push({
			item: [{ title: item.title }, { link: item.link }],
		});
	});

	const xmlString =
		'<?xml version="1.0" encoding="UTF-8"?>' + xml(xmlObject, { indent: "  " });

	return xmlString;
}

export function updateItems(
	userInput: UserInput,
	RSSinput: Array<UserInput>
): string {
	let foundItem = false;
	let foundLink = false;
	for (const item of RSSinput) {
		if (item.title === userInput.title) {
			item.link = userInput.link;
			foundItem = true;
			break;
		}
	}
	if (!foundItem) {
		RSSinput.push({ title: userInput.title, link: userInput.link });
	}
	const RSS = createRSS(RSSinput);
	fs.writeFileSync("data/output/feed.xml", RSS);
	return RSS;
}

export default data;
