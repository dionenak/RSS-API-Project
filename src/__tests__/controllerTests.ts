import {
  RSSinputType,
  UserInput,
  createRSS,
  updateItems,
} from '../controller/routeController';
const mockData: RSSinputType['items'] = [
  {
    title: 'onetitle',
    link: 'http:one-title',
    description: 'onedescription',
    date: 1,
  },
  {
    title: 'secondtitle',
    link: 'http:second-title',
    description: 'seconddescription',
    date: 100000000,
  },
];
describe('CreateRSS', () => {
  const mockXML = createRSS(mockData);
  const xmlExpected =
    '<?xml version="1.0" encoding="UTF-8"?><rss version="2.0">\n  ' +
    '<channel>\n    ' +
    '<title>My-own-RSS-Feed</title>\n    ' +
    '<link>https://github.com/dionenak/RSS-API-Project</link>\n    ' +
    '<description>Creating and managing your online content using RSS Feed.</description>\n    ' +
    '<language>en-us</language>\n    ' +
    '<item>\n      ' +
    '<title>secondtitle</title>\n      ' +
    '<link>http:second-title</link>\n      ' +
    '<description>seconddescription</description>\n      ' +
    '<lastBuildDate>Fri Jan 02 1970</lastBuildDate>\n    ' +
    '</item>\n    ' +
    '<item>\n      ' +
    '<title>onetitle</title>\n      ' +
    '<link>http:one-title</link>\n      ' +
    '<description>onedescription</description>\n      ' +
    '<lastBuildDate>Thu Jan 01 1970</lastBuildDate>\n    ' +
    '</item>\n  ' +
    '</channel>\n' +
    '</rss>';
  test('with one item', () => {
    expect(mockXML).toBeDefined();
    expect(mockXML).toBe(xmlExpected);
  });
});

describe('updateItems', () => {
  const additionalData = {
    title: 'additionalTitle',
    link: 'http:additionalData-title',
    description: 'additionalDescription',
  };
  const mockOutputData = updateItems(additionalData, mockData);
  test('with one item', () => {
    expect(mockData).toBeDefined();
    expect(mockData.length).toBe(3);
  });
});
