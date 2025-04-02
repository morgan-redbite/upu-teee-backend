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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Privy_1 = require("../services/external/Privy");
const ManufacturerRouter = (0, express_1.Router)();
ManufacturerRouter.get("/", (req, res) => {
    res.send("Nothing to see");
});
ManufacturerRouter.post("/register", Privy_1.authenticatePrivy, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('hi', req === null || req === void 0 ? void 0 : req.user);
        res.json({
            message: "Register"
        });
    }
    catch (error) {
        res.status(400).json({
            message: error
        });
    }
}));
ManufacturerRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({
            message: "Login"
        });
    }
    catch (error) {
        res.status(400).json({
            message: error
        });
    }
}));
ManufacturerRouter.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({
            message: "Products"
        });
    }
    catch (error) {
        res.status(400).json({
            message: error
        });
    }
}));
exports.default = ManufacturerRouter;
