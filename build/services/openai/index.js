"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openAiClient = void 0;
const openai_1 = __importDefault(require("openai"));
/** OpenAI client customised for the project
 * @param {string} apiKey - OpenAI API key
 * @param {string | undefined} baseURL - OpenAI base URL
**/
const openAiClient = ({ apiKey, baseURL }) => {
    return new openai_1.default({
        apiKey,
        baseURL: baseURL !== null && baseURL !== void 0 ? baseURL : null,
    });
};
exports.openAiClient = openAiClient;
