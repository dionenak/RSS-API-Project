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
const express_1 = __importDefault(require("express"));
const routeController_1 = __importStar(require("../controller/routeController"));
const router = express_1.default.Router();
router.get("/api", (req, res) => {
    const RSS = (0, routeController_1.createRSS)(routeController_1.default.items);
    res.type(".rss").send(RSS);
});
router.post("/api", (req, res) => {
    const userInput = {
        title: req.body.title,
        link: req.body.link,
        description: req.body.description,
    };
    if (!userInput.link || !userInput.title || !userInput.description)
        return (res
            // `Unprocessable Entity` error code.
            .status(422)
            .send({
            message: "Wrong input. Please insert a valid link, title and description.",
        }));
    const RSS = (0, routeController_1.updateItems)(userInput, routeController_1.default.items);
    res.type(".rss").send(RSS);
});
exports.default = router;
