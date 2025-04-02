import mongoose, { Document, Schema } from 'mongoose';

interface IPropertyValue {
  name: string;
  value: string;
}

interface IIdentity {
  type: string;
  value: string;
}

interface IOwnershipInfo {
  ownedBy: {
    name: string;
  };
  ownedFrom: Date;
  ownedThrough?: Date;
}

interface IRepairAction {
  actionStatus: string;
  startTime: Date;
  description: string;
}

interface IOfferWarranty {
  durationOfWarranty: {
    value: number;
    unitCode: string;
  };
  warrantyScope: {
    name: string;
  };
}

interface IOffer {
  price: number;
  priceCurrency: string;
  availability: string;
  itemCondition: string;
  warranty: IOfferWarranty;
}

export interface IProduct extends Document {
  name: string;
  url: string;
  image: string[];
  description: string;
  categories: string[];
  tags: string[];
  audience: string[];
  brand: {
    name: string;
  };
  manufacturer: {
    name: string;
    url?: string;
  };
  color: {
    name: string;
    hex: string;
  };
  productionDate: Date;
  offers: IOffer;
  productDimensions: {
    value: string;
    unitText: string;
  };
  weight: {
    value: number;
    unitText: string;
  };
  additionalProperty: IPropertyValue[];
  ownershipHistory: IOwnershipInfo[];
  repairHistory: IRepairAction[];
  identity: IIdentity[];
  manual: string;
  privacyPolicy: string;
  customProperties?: any;
}

export const IProductTypes = `{
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
}`
const ProductSchema: Schema = new Schema({
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
}, {
  timestamps: true,
});

const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);
export default ProductModel;
