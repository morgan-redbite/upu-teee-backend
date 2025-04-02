"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryChatbotMongoose = exports.aggregateResult = void 0;
const product_schema_1 = __importDefault(require("../../database/schema/product.schema"));
const openai_1 = require("../openai");
const aggregateResult = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const agg = [
            {
                $search: {
                    text: {
                        query: query,
                        path: {
                            wildcard: "*",
                        }
                    },
                },
            }
        ];
        const cursor = yield product_schema_1.default.aggregate(agg);
        return cursor;
    }
    catch (error) {
        console.error('Error in queryChatbotMongoose:', error);
    }
});
exports.aggregateResult = aggregateResult;
const queryChatbotMongoose = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const agg = [
            {
                $search: {
                    text: {
                        query: query,
                        path: {
                            wildcard: "*",
                        }
                    },
                },
            }
        ];
        const cursor = yield product_schema_1.default.aggregate(agg);
        const message = yield fromQueryToTextAgent(cursor, query);
        return message;
    }
    catch (error) {
        console.error('Error in queryChatbotMongoose:', error);
    }
});
exports.queryChatbotMongoose = queryChatbotMongoose;
const userPrompt = `
You are a query result-to-text agent that converts JSON query results into plain text. 
The user's question is "{question}". Based on the following query result: {queryResult}, extract and describe the relevant information in a single paragraph with no markdown formatting, no newline characters, and no escape sequences (for example, do not output " with a backslash). 
Your answer should be descriptive, polite, and helpful. If you need more details, ask the user for clarification.
`;
const fromQueryToTextAgent = (query, userQuestion) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = (0, openai_1.openAiClient)({
            apiKey: process.env.OPENAI_API_KEY,
            baseURL: process.env.OPENAI_API_URL
        });
        const output = yield client.chat.completions.create({
            // you can specify the model you want to use
            model: 'qwen/qwen2.5-7b-instruct',
            messages: [{
                    role: 'user',
                    content: userPrompt.replace('{question}', userQuestion).replace('{queryResult}', JSON.stringify(query))
                }],
            temperature: 0,
        });
        return output.choices[0].message.content;
    }
    catch (error) {
        console.error('Error [fromQueryToTextAgent]:', error);
    }
});
