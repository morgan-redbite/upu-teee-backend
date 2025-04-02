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
const uDID_1 = require("../services/web3/uDID");
const did_indexer_schema_1 = __importDefault(require("../database/schema/did-indexer.schema"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("Hello World!");
});
router.get("/generate-udid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, uDID_1.generateDIDDocumet)();
    res.json({
        result,
    });
}));
router.post("/index-udid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (data.udid && data.owner) {
            yield did_indexer_schema_1.default.create(data);
            res.json({
                message: "Success",
            });
        }
        else {
            res.status(400).json({
                message: "Missing uDID or owner",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error,
        });
    }
}));
router.get("/get-udids", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.query.ownerAddress) {
            res.status(400).json({
                message: "Missing ownerAddress",
            });
        }
        else {
            const result = yield did_indexer_schema_1.default.find({
                owner: req.query.ownerAddress,
            });
            // udid arrays
            const udidArray = result.map(item => item.udid);
            res.json({
                result: udidArray,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error,
        });
    }
}));
const Web3Router = router;
exports.default = Web3Router;
