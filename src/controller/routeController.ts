import config from "config";
import xml from "xml";
import * as fs from "fs";

export type UserInput = { title: string; link: string };
type dataType = { ["items"]: Array<UserInput> };
type Flatten<T> = T extends any[] ? T[number] : {};
type FeedType = Array<{
	item: [{ title: string }, { link: string }];
}>;

type XmlObjectType = {
	rss: [
		{ _attr: { version: number } },
		{
			channel: [
				{ title: string },
				{ link: string },
				{ description: string },
				{ language: string },
				Flatten<FeedType>?
			];
		}
	];
};

const data: dataType = {
	items: [],
};

/**
 * Constructing the XML object.
 */
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

	const initialXmlObject: XmlObjectType = {
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

	data.items.forEach((item: UserInput) => {
		xmlObject.rss[1].channel.push({
			item: [{ title: item.title }, { link: item.link }],
		});
	});

	const xmlString =
		'<?xml version="1.0" encoding="UTF-8"?>' + xml(xmlObject, { indent: "  " });

	return xmlString;
}

export function updateItems(userInput: UserInput, RSSinput: Array<UserInput>) {
	let foundItem = false;
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
