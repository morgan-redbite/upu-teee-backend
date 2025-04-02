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
const express_1 = require("express");
const query_services_1 = require("../services/mongo/query.services");
const translate_1 = require("../services/translate");
const aggregate_services_1 = require("../services/mongo/aggregate.services");
const productDescription_schema_1 = __importDefault(require("../database/schema/productDescription.schema"));
const product_schema_1 = __importDefault(require("../database/schema/product.schema"));
const router = (0, express_1.Router)();
// POST /upsert to create or update a product information.
router.post("/upsert", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        console.log('data', data);
        if (data.json && data.description && data.UDID) {
            const result = yield (0, query_services_1.createOrUpdateProductInformation)(data.json);
            yield productDescription_schema_1.default.create({
                udid: data.UDID,
                description: data.description
            });
            res.json({
                message: result,
            });
        }
        else {
            res.status(400).json({
                message: "Missing json or productDescription or UDID",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error,
        });
    }
}));
// GET / to get a product information by DID.
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const did = req.query.did;
        const getJson = yield product_schema_1.default.findOne({
            identity: { $elemMatch: { type: "did", value: did } }
        });
        res.json({
            message: getJson,
        });
    }
    catch (error) {
        res.status(500).json({
            error,
        });
    }
}));
// POST /generate-to-json to convert text to JSON by leveraging the translation model.
router.post("/generate-to-json", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const text = req.body;
        console.log('text', text);
        const result = yield (0, translate_1.fromTextToJsonAgent)(text);
        res.json({
            message: result,
        });
    }
    catch (error) {
        res.status(500).json({
            error,
        });
    }
}));
// GET /get-udpd to get a product information by DID.
router.get(`/get-udpd`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const udid = req.query.udid;
        console.log;
        if (!udid) {
            throw new Error("No DID provided in the product identity.");
        }
        if (typeof udid !== 'string') {
            throw new Error("uDID must be a string.");
        }
        const result = yield (0, query_services_1.getDPDByDID)(udid);
        res.json({
            result,
        });
    }
    catch (error) {
        res.status(500).json({
            error,
        });
    }
}));
// GET /get-all-udpd to get all product information.
router.get('/get-all-udpd', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_schema_1.default.find();
        res.json({
            result,
        });
    }
    catch (error) {
        console.error('Error in get-all-udpd:', error);
    }
}));
// GET /query to get a product information by search.
router.get('/query', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const search = req.query.search;
        if (!search) {
            throw "No search provided.";
        }
        if (typeof search !== 'string') {
            throw "Search must be a string.";
        }
        const result = yield (0, aggregate_services_1.aggregateResult)(search);
        res.json({
            result,
        });
    }
    catch (error) {
        res.status(500).json({
            error,
        });
    }
}));
// POST /chat-product to chat with the product.
router.post('/chat-product', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = req.body.question;
        if (!question) {
            throw "No question provided.";
        }
        const result = yield (0, aggregate_services_1.queryChatbotMongoose)(question);
        res.json({
            result,
        });
    }
    catch (error) {
        console.error('Error in test:', error);
        res.status(500).json({
            error,
        });
    }
}));
const ProductRouter = router;
exports.default = ProductRouter;
