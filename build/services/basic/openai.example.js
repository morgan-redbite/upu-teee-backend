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
const openai_1 = __importDefault(require("openai"));
const openAiExample = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const openAiClient = new openai_1.default({
            baseURL: process.env.OPENAI_API_URL,
            apiKey: process.env.OPENAI_API_KEY,
        });
        const result = yield openAiClient.models.list();
        // @ts-ignore
        const sampleGAI = yield openAiClient.chat.completions.create({
            model: 'text2cypher',
            messages: [{
                    role: 'system',
                    content: 'You are a helpful assistant'
                }, {
                    role: 'user',
                    content: 'What is the capital of France?'
                }]
        });
        console.log('sampleGAI', sampleGAI.choices[0].message.content);
    }
    catch (error) {
        console.error('Err', error);
    }
});
openAiExample();
