"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItems = exports.createRSS = void 0;
const config_1 = __importDefault(require("config"));
const xml_1 = __importDefault(require("xml"));
const data = {
    items: [],
};
/**
 * Constructing the XML object.
 */
function instantiateRSS() {
    /**
     * Info we want from config for our XML.
     */
    const projectInfo = config_1.default.get("project");
    const initialXmlObject = {
        rss: [
            {
                _attr: {
                    version: config_1.default.get("rss.version"),
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
function createRSS(items) {
    let xmlObject = instantiateRSS();
    items.forEach((item) => {
        xmlObject.rss[1].channel.push({
            item: [
                { title: item.title },
                { link: item.link },
                { description: item.description },
                { lastBuildDate: new Date(item.date).toDateString() },
            ],
        });
    });
    const xmlString = '<?xml version="1.0" encoding="UTF-8"?>' + (0, xml_1.default)(xmlObject, { indent: "  " });
    return xmlString;
}
exports.createRSS = createRSS;
function updateItems(userInput, RSSinput) {
    let foundItem = false;
    const inputToBePassed = Object.assign(Object.assign({}, userInput), { date: Date.now() });
    for (let item of RSSinput) {
        if (item.title === userInput.title) {
            item = inputToBePassed;
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
exports.updateItems = updateItems;
exports.default = data;
