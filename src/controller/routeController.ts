import config from 'config';
import xml from 'xml';

export interface UserInput {
  title: string;
  link: string;
  description: string;
}
export type RSSinputType = { ['items']: Array<UserInput & { date: number }> };

type FeedType = Array<{
  item: [
    { title: string },
    { link: string },
    { description: string },
    { lastBuildDate: string }
  ];
}>;
type Flatten<T> = T extends any[] ? T[number] : {};

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

const data: RSSinputType = {
  items: [],
};

/**
 * Constructing the XML object.
 */
function instantiateRSS() {
  /**
   * Info we want from config for our XML.
   */
  const projectInfo = config.get<{
    title: string;
    link: string;
    description: string;
    lang: string;
  }>('project');

  const initialXmlObject: XmlObjectType = {
    rss: [
      {
        _attr: {
          version: config.get<number>('rss.version'),
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
/**
 * Creating RSS feed as XML string.
 */
export function createRSS(RSSinput: RSSinputType['items']): string {
  let xmlObject = instantiateRSS();

  RSSinput.forEach((item) => {
    xmlObject.rss[1].channel.push({
      item: [
        { title: item.title },
        { link: item.link },
        { description: item.description },
        { lastBuildDate: new Date(item.date).toDateString() },
      ],
    });
  });

  const xmlString =
    '<?xml version="1.0" encoding="UTF-8"?>' + xml(xmlObject, { indent: '  ' });
  return xmlString;
}
/**
 * Adding items to XML.
 */
export function updateItems(
  userInput: UserInput,
  RSSinput: RSSinputType['items']
) {
  let foundItem = false;
  const inputToBePassed = { ...userInput, date: Date.now() };
  for (const [i, item] of RSSinput.entries()) {
    if (item.title === userInput.title) {
      RSSinput[i] = { ...inputToBePassed };
      foundItem = true;
      break;
    }
  }
  if (!foundItem) {
    RSSinput.unshift(inputToBePassed);
  }
  const RSS = createRSS(RSSinput);
  return RSS;
}

export default data;
