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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.IProductTypes = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.IProductTypes = `{
  name: { type: String, required: true },
  url: { type: String },
  image: [{ type: String }],
  description: { type: String },
  categories: [{ type: String }], // Changed from single string to array of strings
  tags: [{ type: String }],
  audience: [{ type: String }],
  brand: {
    name: { type: String, required: true },
  },
  manufacturer: {
    name: { type: String, required: true },
    url: { type: String },
  },
  color: {
    name: { type: String },
    hex: { type: String },
  },
  productionDate: { type: Date },
  offers: {
    price: { type: Number },
    priceCurrency: { type: String },
    availability: { type: String },
    itemCondition: { type: String },
    warranty: {
      durationOfWarranty: {
        value: { type: Number },
        unitCode: { type: String },
      },
      warrantyScope: {
        name: { type: String },
      },
    },
  },
  productDimensions: {
    value: { type: String },
    unitText: { type: String },
  },
  weight: {
    value: { type: Number },
    unitText: { type: String },
  },
  additionalProperty: [
    {
      name: { type: String },
      value: { type: String },
    }
  ],
  ownershipHistory: [
    {
      ownedBy: {
        name: { type: String },
      },
      ownedFrom: { type: Date },
      ownedThrough: { type: Date },
    }
  ],
  repairHistory: [
    {
      actionStatus: { type: String },
      startTime: { type: Date },
      description: { type: String },
    }
  ],
  identity: [
    {
      type: { type: String },
      value: { type: String },
    }
  ],
  manual: { type: String },
  privacyPolicy: { type: String },
  customProperties: { type: Schema.Types.Mixed },
}`;
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    url: { type: String },
    image: [{ type: String }],
    description: { type: String },
    categories: [{ type: String }], // Changed from single string to array of strings
    tags: [{ type: String }],
    audience: [{ type: String }],
    brand: {
        name: { type: String, required: true },
    },
    manufacturer: {
        name: { type: String, required: true },
        url: { type: String },
    },
    color: {
        name: { type: String },
        hex: { type: String },
    },
    productionDate: { type: Date },
    offers: {
        price: { type: Number },
        priceCurrency: { type: String },
        availability: { type: String },
        itemCondition: { type: String },
        warranty: {
            durationOfWarranty: {
                value: { type: Number },
                unitCode: { type: String },
            },
            warrantyScope: {
                name: { type: String },
            },
        },
    },
    productDimensions: {
        value: { type: String },
        unitText: { type: String },
    },
    weight: {
        value: { type: Number },
        unitText: { type: String },
    },
    additionalProperty: [
        {
            name: { type: String },
            value: { type: String },
        }
    ],
    ownershipHistory: [
        {
            ownedBy: {
                name: { type: String },
            },
            ownedFrom: { type: Date },
            ownedThrough: { type: Date },
        }
    ],
    repairHistory: [
        {
            actionStatus: { type: String },
            startTime: { type: Date },
            description: { type: String },
        }
    ],
    identity: [
        {
            type: { type: String },
            value: { type: String },
        }
    ],
    manual: { type: String },
    privacyPolicy: { type: String },
    customProperties: { type: mongoose_1.Schema.Types.Mixed },
}, {
    timestamps: true,
});
const ProductModel = mongoose_1.default.model('Product', ProductSchema);
exports.default = ProductModel;
