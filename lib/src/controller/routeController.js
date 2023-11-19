"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItems = void 0;
const config_1 = __importDefault(require("config"));
const xml_1 = __importDefault(require("xml"));
const fs = __importStar(require("fs"));
function createRSS(items) {
    const projectInfo = config_1.default.get("project");
    const xmlObject = {
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
                    ...items.map((item) => {
                        return {
                            item: [{ title: item.title }, { link: item.url }],
                        };
                    }),
                ],
            },
        ],
    };
    const xmlString = '<?xml version="1.0" encoding="UTF-8"?>' + (0, xml_1.default)(xmlObject, { indent: "  " });
    return xmlString;
}
function updateItems(userInput, RSSinput) {
    let found = false;
    for (const item of RSSinput) {
        if (item.title === userInput.title) {
            userInput.url = userInput.url;
            // What do we do when we have more than once the same title?
            found = true;
        }
    }
    if (!found)
        RSSinput.push({ title: userInput.title, url: userInput.url });
    const RSS = createRSS(RSSinput);
    fs.writeFileSync("data/output/feed.xml", RSS);
    return RSS;
}
exports.updateItems = updateItems;
