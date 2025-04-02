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
exports.uploadDIDDocument = exports.generateDIDDocumet = void 0;
const uuid_1 = require("uuid");
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const form_data_1 = __importDefault(require("form-data"));
// Generate a DID Document
// Note: This is a simple example and should be customized to your needs.
const generateDIDDocumet = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Example "did:uminai:<uuid4>"
        const uniqueId = (0, uuid_1.v4)();
        // E.g. did:prism:c36cd59bbc62dee1925e1343a8fed051416e417116d6169d060746f1e6816cd4
        const didDocument = {
            "@context": [
                "https://www.w3.org/ns/did/v1",
                "https://w3id.org/security/suites/ed25519-2020/v1"
            ],
            "id": `did:uminai:${uniqueId}`,
            "verificationMethod": [
                {
                    "id": `did:uminai:${uniqueId}#key-1`,
                    "type": "Ed25519VerificationKey2020",
                    "controller": `did:uminai:${uniqueId}`,
                    "publicKeyMultibase": "z6MkkVbyHJLLjdjU5B62DaJ4mkdMdUkttf9UqySSkA9bVTeZExample",
                },
            ],
            "authentication": [
                `did:uminai:${uniqueId}#key-1`,
            ],
            "controller": [
                `did:uminai:${uniqueId}`,
            ],
            "service": [
                {
                    "id": `did:uminai:${uniqueId}#service-1`,
                    "type": "uminaiWeb3Service",
                    "serviceEndpoint": "https://api.uminai.com/services/web3/"
                }
            ]
        };
        const cid = yield uploadDIDDocument({ uDID: uniqueId, uDIDDocument: didDocument });
        return { uniqueId, cid };
    }
    catch (error) {
        console.error(error);
    }
});
exports.generateDIDDocumet = generateDIDDocumet;
// Upload DID Document to IPFS
const uploadDIDDocument = (_a) => __awaiter(void 0, [_a], void 0, function* ({ uDID, uDIDDocument }) {
    try {
        const fileName = `did_uminai_${uDID}`;
        // check if uDIDDocument is JSON
        const isJSON = typeof uDIDDocument === 'object' && uDIDDocument !== null;
        if (!isJSON) {
            throw new Error('uDIDDocument is not a valid JSON');
        }
        const jsonString = JSON.stringify(uDIDDocument);
        // Create a temporary JSON file
        const filePath = path_1.default.join(__dirname + '/tmp', `${fileName}`);
        fs_1.default.writeFileSync(filePath, jsonString);
        // Create a FormData instance and append the file and path
        const formData = new form_data_1.default();
        formData.append('file', fs_1.default.createReadStream(filePath));
        formData.append('path', '/');
        // Upload DID Document to IPFS
        const response = yield axios_1.default.post(`https://api.chainsafe.io/api/v1/bucket/${process.env.CHAINSAFE_BUCKET_ID}/upload`, formData, {
            headers: Object.assign({ 'Authorization': `Bearer ${process.env.CHAINSAFE_API_KEY}` }, formData.getHeaders()),
        });
        fs_1.default.unlinkSync(filePath);
        console.log('response', response.data);
        if (response.data.files_details[0].status) {
            return response.data.files_details[0].cid;
        }
        else {
            throw 'Error uploading JSON file';
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.uploadDIDDocument = uploadDIDDocument;
