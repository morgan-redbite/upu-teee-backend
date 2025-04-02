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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDPDByDID = exports.createOrUpdateProductInformation = void 0;
const product_schema_1 = __importDefault(require("../../database/schema/product.schema"));
const createOrUpdateProductInformation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Extract the DID from the identity array.
        const did = (_a = data.identity.find(item => item.type.toLowerCase() === "did")) === null || _a === void 0 ? void 0 : _a.value;
        if (!did) {
            throw new Error("No DID provided in the product identity.");
        }
        // Find the existing product by DID.
        const existingProduct = yield product_schema_1.default.findOne({
            identity: { $elemMatch: { type: "did", value: did } }
        });
        if (existingProduct) {
            // Merge customProperties: preserve existing values and override with new ones.
            const mergedCustomProperties = Object.assign(Object.assign({}, existingProduct.customProperties), data.customProperties);
            // Assign merged properties back to data.
            data.customProperties = mergedCustomProperties;
            // Update the document using $set operator.
            const result = yield product_schema_1.default.updateOne({ identity: { $elemMatch: { type: "did", value: did } } }, { $set: data }, { upsert: true });
            console.log("Update result:", result);
            return result;
        }
        else {
            // If no document exists, create a new one.
            const result = yield product_schema_1.default.create(data);
            console.log("Created new product:", result);
            return result;
        }
    }
    catch (error) {
        console.error("Error in createOrUpdateProductInformation:", error);
        throw error;
    }
});
exports.createOrUpdateProductInformation = createOrUpdateProductInformation;
const getDPDByDID = (did) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isFound = yield product_schema_1.default.findOne({
            identity: {
                $elemMatch: {
                    type: { $regex: /^did$/, $options: "i" }, // Case-insensitive match for "did"
                    value: did
                }
            }
        });
        if (!isFound) {
            throw new Error("No product found with the provided DID.");
        }
        const resultFromProductModel = yield product_schema_1.default.findOne({
            identity: { $elemMatch: { type: "did", value: did } }
        });
        if (!resultFromProductModel)
            throw new Error("No product found with the provided DID.");
        const _a = resultFromProductModel.toObject(), { _id, __v } = _a, result = __rest(_a, ["_id", "__v"]);
        return result;
    }
    catch (error) {
        console.error("Error in getDPDByDID:", error);
        throw error;
    }
});
exports.getDPDByDID = getDPDByDID;
