"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MISTRAL_SYSTEM_PROMPT = exports.MESSAGES_WITH_ASSISTANT = exports.constructUserPrompt = exports.JENSEN_VACUUM_V3_UNSTRUCTURED = exports.JENSEN_VACUUM_V3 = exports.RV_REFRIGERATOR_UNSTRUCTURED = exports.RV_REFRIGERATOR = exports.MISTRAL_LLM_CLASSIFICATION_EXAMPLE = exports.MISTRAL_PROMPT = void 0;
const product_schema_1 = require("../../database/schema/product.schema");
const RV_REFRIGERATOR = {
    "brand": {
        "name": "RV Electronics Co."
    },
    "manufacturer": {
        "name": "RV Electronics Co.",
        "url": "https://example.com/about"
    },
    "color": {
        "name": "Silver",
        "hex": "#C0C0C0"
    },
    "offers": {
        "warranty": {
            "durationOfWarranty": {
                "value": 2,
                "unitCode": "ANN"
            },
            "warrantyScope": {
                "name": "Manufacturer Warranty"
            }
        },
        "price": 1299.99,
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
    },
    "productDimensions": {
        "value": "70 x 35 x 32",
        "unitText": "inches"
    },
    "weight": {
        "value": 80,
        "unitText": "kg"
    },
    "additionalProperty": [
        {
            "name": "Suppliers",
            "value": "Global Steel Inc.; Smart Tech Components Ltd.",
            "_id": "67c4d05de5d8ddbf8205a83e"
        },
        {
            "name": "Certifications",
            "value": "Energy Star, CE, ISO 9001",
            "_id": "67c4d05de5d8ddbf8205a83f"
        },
        {
            "name": "Country of Origin",
            "value": "USA",
            "_id": "67c4d05de5d8ddbf8205a840"
        },
        {
            "name": "Recyclability",
            "value": "85% recyclable materials",
            "_id": "67c4d05de5d8ddbf8205a841"
        }
    ],
    "audience": [
        "Home Users",
        "Tech Enthusiasts"
    ],
    "categories": [
        "Smart Appliances",
        "Kitchen Appliances",
        "Refrigerators"
    ],
    "customProperties": {
        "newadd2b": "dsds",
        "newadd": "haaha",
        "cool2": 1
    },
    "description": "A high-tech appliance designed for energy efficiency, smart connectivity, and sustainability.",
    "identity": [
        {
            "type": "gtin",
            "value": "0123456789012",
            "_id": "67c4d05de5d8ddbf8205a836"
        },
        {
            "type": "did",
            "value": "did:uminai:19143aff-270f-4ac2-be1b-6cb5240dd6ea",
            "_id": "67c4d05de5d8ddbf8205a837"
        },
        {
            "type": "Batch Number",
            "value": "RV-2025-SMFR-001",
            "_id": "67c4d05de5d8ddbf8205a838"
        }
    ],
    "image": [
        "https://example.com/images/rv-smart-refrigerator-front.jpg",
        "https://example.com/images/rv-smart-refrigerator-inside.jpg"
    ],
    "manual": "https://example.com/manuals/rv-smart-refrigerator.pdf",
    "name": "RV Smart Refrigerator",
    "ownershipHistory": [
        {
            "ownedBy": {
                "name": "John Doe"
            },
            "ownedFrom": "2025-02-15T00:00:00.000Z",
            "ownedThrough": "2026-01-01T00:00:00.000Z",
            "_id": "67c4d05de5d8ddbf8205a83b"
        },
        {
            "ownedBy": {
                "name": "Jane Smith"
            },
            "ownedFrom": "2026-01-01T00:00:00.000Z",
            "ownedThrough": "2028-01-01T00:00:00.000Z",
            "_id": "67c4d05de5d8ddbf8205a83c"
        },
        {
            "ownedBy": {
                "name": "Current Owner"
            },
            "ownedFrom": "2028-01-01T00:00:00.000Z",
            "_id": "67c4d05de5d8ddbf8205a83d"
        }
    ],
    "privacyPolicy": "https://example.com/privacy",
    "productionDate": "2025-02-15T00:00:00.000Z",
    "repairHistory": [
        {
            "actionStatus": "CompletedActionStatus",
            "startTime": "2027-05-12T00:00:00.000Z",
            "description": "Cooling fan replaced due to overheating issue",
            "_id": "67c4d05de5d8ddbf8205a839"
        },
        {
            "actionStatus": "CompletedActionStatus",
            "startTime": "2028-03-15T00:00:00.000Z",
            "description": "Refrigerant leak repaired",
            "_id": "67c4d05de5d8ddbf8205a83a"
        }
    ],
    "tags": [
        "energy-efficient",
        "smart connectivity",
        "sustainable",
        "Wi-Fi enabled",
        "high-tech"
    ],
    "url": "https://example.com/products/rv-smart-refrigerator"
};
exports.RV_REFRIGERATOR = RV_REFRIGERATOR;
const RV_REFRIGERATOR_UNSTRUCTURED = `The RV Smart Refrigerator is a cutting-edge product in the Smart Appliances category, designed for energy efficiency, smart connectivity, and sustainability. You can learn more about this product at https://example.com/products/rv-smart-refrigerator. It is showcased with two images – one showing the front view and another depicting the inside, available at https://example.com/images/rv-smart-refrigerator-front.jpg and https://example.com/images/rv-smart-refrigerator-inside.jpg respectively.

This high-tech appliance is described as “A high-tech appliance designed for energy efficiency, smart connectivity, and sustainability.” It is organized under three categories: Smart Appliances, Kitchen Appliances, and Refrigerators. Additionally, it carries several tags – energy-efficient, smart connectivity, sustainable, Wi-Fi enabled, and high-tech – that highlight its modern features, and it is targeted at audiences such as Home Users and Tech Enthusiasts.

The refrigerator is a product of RV Electronics Co., which is both the brand and the manufacturer. For more information about the manufacturer, visit https://example.com/about. The appliance comes in a distinctive color, with a human-readable name “Silver” and a hexadecimal color value of #C0C0C0.

Manufactured on February 15, 2025, the RV Smart Refrigerator is offered at a price of $1299.99 USD. It is currently in stock and classified as a new product, as indicated by its availability and condition (https://schema.org/InStock and https://schema.org/NewCondition respectively). The product is backed by a warranty provided by the manufacturer that lasts for 2 years (2 ANN), under a warranty scope titled “Manufacturer Warranty.”

In terms of physical specifications, the refrigerator measures 70 x 35 x 32 inches and weighs 80 kg. Additional properties include details about its suppliers—Global Steel Inc. and Smart Tech Components Ltd.—and certifications such as Energy Star, CE, and ISO 9001. It is made in the USA, and 85% of its materials are recyclable.

The ownership history of this refrigerator is well documented. Initially, it was owned by John Doe from its production date on February 15, 2025 until January 1, 2026. Following that, Jane Smith took over ownership from January 1, 2026 until January 1, 2028. Since January 1, 2028, the appliance has been with its current owner.

Service records indicate that the refrigerator underwent repairs on two occasions. On May 12, 2027, a cooling fan was replaced due to an overheating issue. Later, on March 15, 2028, a repair was carried out to fix a refrigerant leak.

For product identification, multiple identifiers are used. It has a GTIN of 0123456789012, a decentralized identifier (DID) of did:uminai:19143aff-270f-4ac2-be1b-6cb5240dd6ea, and a Batch Number of RV-2025-SMFR-001.

Further resources include a user manual available at https://example.com/manuals/rv-smart-refrigerator.pdf and the privacy policy can be viewed at https://example.com/privacy.`;
exports.RV_REFRIGERATOR_UNSTRUCTURED = RV_REFRIGERATOR_UNSTRUCTURED;
const JENSEN_VACUUM_V3 = {
    "brand": {
        "name": "Jensen Daily Electronics Co."
    },
    "manufacturer": {
        "name": "Jensen Daily Electronics Co.",
        "url": "https://example.com/about-jensen"
    },
    "color": {
        "name": "Black",
        "hex": "#000000"
    },
    "offers": {
        "warranty": {
            "durationOfWarranty": {
                "value": 1,
                "unitCode": "ANN"
            },
            "warrantyScope": {
                "name": "Manufacturer Warranty"
            }
        },
        "price": 499.99,
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
    },
    "productDimensions": {
        "value": "15 x 10 x 8",
        "unitText": "inches"
    },
    "weight": {
        "value": 5,
        "unitText": "kg"
    },
    "name": "Jensen Vacuum V3",
    "url": "https://example.com/products/jensen-vacuum-v3",
    "image": [
        "https://example.com/images/jensen-vacuum-v3-front.jpg",
        "https://example.com/images/jensen-vacuum-v3-side.jpg"
    ],
    "description": "A high-performance vacuum designed for efficient cleaning, advanced suction technology, and durable performance.",
    "categories": [
        "Home Appliances",
        "Cleaning Appliances",
        "Vacuum Cleaners"
    ],
    "tags": [
        "powerful suction",
        "efficient cleaning",
        "durable",
        "lightweight",
        "high-tech"
    ],
    "audience": [
        "Home Users",
        "Cleaning Enthusiasts"
    ],
    "productionDate": "2025-06-01T00:00:00.000Z",
    "additionalProperty": [
        {
            "name": "Battery Life",
            "value": "60 minutes",
            "_id": "67c4d06be5d8ddbf8205a845"
        },
        {
            "name": "Certifications",
            "value": "Energy Star, CE",
            "_id": "67c4d06be5d8ddbf8205a846"
        },
        {
            "name": "Country of Origin",
            "value": "USA",
            "_id": "67c4d06be5d8ddbf8205a847"
        }
    ],
    "ownershipHistory": [],
    "repairHistory": [],
    "identity": [
        {
            "type": "gtin",
            "value": "3123456789313",
            "_id": "67c4d06be5d8ddbf8205a848"
        },
        {
            "type": "did",
            "value": "did:uminai:19143aff-370f-4ac2-be1b-6cb5240dd6ea",
            "_id": "67c4d06be5d8ddbf8205a849"
        },
        {
            "type": "Batch Number",
            "value": "JDE-520-JV-003",
            "_id": "67c4d06be5d8ddbf8205a84a"
        }
    ],
    "manual": "https://example.com/manuals/jensen-vacuum-v3.pdf",
    "privacyPolicy": "https://example.com/privacy-jensen"
};
exports.JENSEN_VACUUM_V3 = JENSEN_VACUUM_V3;
const JENSEN_VACUUM_V3_UNSTRUCTURED = `Introducing the Jensen Vacuum V3, a high-performance vacuum cleaner designed for efficient cleaning with advanced suction technology and durable performance. Manufactured by Jensen Daily Electronics Co., this innovative appliance is available for purchase at https://example.com/products/jensen-vacuum-v3. You can view its sleek design through two images—one showing the front view at https://example.com/images/jensen-vacuum-v3-front.jpg and another highlighting its side profile at https://example.com/images/jensen-vacuum-v3-side.jpg.

The Jensen Vacuum V3 is engineered to deliver powerful suction and efficient cleaning, making it ideal for both home users and cleaning enthusiasts. It falls under the categories of Home Appliances, Cleaning Appliances, and Vacuum Cleaners, and comes with descriptive tags such as "powerful suction," "efficient cleaning," "durable," "lightweight," and "high-tech." Its modern appearance is accentuated by a sleek black finish, defined by the color name "Black" and a hex value of "#000000."

Produced on June 1, 2025, this vacuum is competitively priced at $499.99 USD, is currently in stock, and is listed in new condition. It is backed by a 1-year manufacturer warranty under the "Manufacturer Warranty" scope, ensuring reliability and peace of mind. The appliance features compact dimensions of 15 x 10 x 8 inches and weighs 5 kg, which contributes to its lightweight and maneuverable design.

Additional features include a battery life of 60 minutes, making it capable of handling extended cleaning sessions. It holds certifications like Energy Star and CE, and it is proudly made in the USA. As of now, there is no recorded ownership history or repair history, indicating that this model is brand new without any previous service or ownership records.

For identification, the Jensen Vacuum V3 carries multiple identifiers: a GTIN of 3123456789313, a decentralized identifier (DID) of did:uminai:19143aff-270f-4ac2-be1b-6cb5240dd6ea, and a Batch Number of JDE-520-JV-003. For further details, a user manual is available at https://example.com/manuals/jensen-vacuum-v3.pdf and the privacy policy can be reviewed at https://example.com/privacy-jensen. Currently, there are no additional custom properties defined for this product.`;
exports.JENSEN_VACUUM_V3_UNSTRUCTURED = JENSEN_VACUUM_V3_UNSTRUCTURED;
const INSPIRON_PROJECTOR_PRO_V2 = {
    "name": "Inspiron Projector Pro2",
    "url": "https://example.com/products/inspiron-projector-pro2",
    "image": [
        "https://example.com/images/inspiron-projector-pro2-front.jpg",
        "https://example.com/images/inspiron-projector-pro2-side.jpg"
    ],
    "description": "Introducing the Inspiron Projector Pro2, a high-performance screen projector engineered to deliver versatile display solutions with bright visuals and crisp imagery for both home and professional environments.",
    "categories": [
        "Projectors",
        "Screen Projectors"
    ],
    "tags": [
        "high-performance",
        "versatile",
        "bright",
        "portable",
        "1080p"
    ],
    "audience": [
        "Home Users",
        "Business Professionals"
    ],
    "brand": {
        "name": "Lowkey Smart Vision Co."
    },
    "manufacturer": {
        "name": "Lowkey Smart Vision Co.",
        "url": "https://example.com/about-lowkey"
    },
    "color": {
        "name": "Black",
        "hex": "#000000"
    },
    "productionDate": "2025-04-01T00:00:00Z",
    "offers": {
        "price": 799.99,
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "warranty": {
            "durationOfWarranty": {
                "value": 1,
                "unitCode": "ANN"
            },
            "warrantyScope": {
                "name": "Manufacturer Warranty"
            }
        }
    },
    "productDimensions": {
        "value": "15 x 10 x 8 inches",
        "unitText": "inches"
    },
    "weight": {
        "value": 3,
        "unitText": "kg"
    },
    "additionalProperty": [
        {
            "name": "Brightness",
            "value": "3000 lumens"
        },
        {
            "name": "Resolution",
            "value": "1080p"
        },
        {
            "name": "Connectivity",
            "value": "HDMI, USB, Wi-Fi"
        }
    ],
    "ownershipHistory": [],
    "repairHistory": [],
    "identity": [
        {
            "type": "DID",
            "value": "did:uminai:99143aff-270f-4ac2-be1b-6cb5240dd6eb"
        },
        {
            "type": "Batch Number",
            "value": "INS-PJ-025P2"
        }
    ],
    "manual": "https://example.com/manuals/inspiron-projector-pro2.pdf",
    "privacyPolicy": "https://example.com/privacy-inspiron",
    "customProperties": {}
};
const INSPIRON_PROJECTOR_PRO_V2_UNSTRUCTURED = `
Introducing the Inspiron Projector Pro2, a high-performance screen projector engineered to deliver versatile display solutions with bright visuals and crisp imagery for both home and professional environments. You can explore more details or purchase this product at https://example.com/products/inspiron-projector-pro2.

This innovative projector is presented through multiple images—a front view available at https://example.com/images/inspiron-projector-pro2-front.jpg and a side view at https://example.com/images/inspiron-projector-pro2-side.jpg—so you can appreciate its sleek design and compact form.

The Inspiron Projector Pro2 is described as a high-performance device specifically designed for screen projection. It falls under the categories of Projectors and Screen Projectors, ensuring it is easily found by those looking for display solutions. The product is further characterized by tags such as “high-performance,” “versatile,” “bright,” “portable,” and “1080p,” making it an excellent fit for both home users and business professionals.

Manufactured by Lowkey Smart Vision Co., which is both the brand and manufacturer of this projector (more about them can be found at https://example.com/about-lowkey), the device boasts a striking Black finish, represented by the color name "Black" and its hex code #000000.

Produced on April 1, 2025, the Inspiron Projector Pro2 is competitively priced at $799.99 USD. It is currently in stock and is classified as a new product according to standard definitions (https://schema.org/InStock and https://schema.org/NewCondition). The projector is also backed by a 1-year manufacturer warranty under the “Manufacturer Warranty” scope, providing assurance of its quality and performance.

In terms of physical specifications, the projector measures 15 x 10 x 8 inches and weighs 3 kg, ensuring that it is both compact and lightweight—ideal for easy setup and portability. Additional properties of the Inspiron Projector Pro2 include a brightness of 3000 lumens, a full HD 1080p resolution, and multiple connectivity options such as HDMI, USB, and Wi-Fi, all of which contribute to its superior performance in various settings.

Currently, there is no recorded ownership or repair history for this model, which suggests that it is either a new release or has not undergone any service events since its production.

For product identification, the Inspiron Projector Pro2 carries essential identifiers. Although it does not have a GTIN yet, it is uniquely identified by a decentralized identifier (DID) of did:uminai:99143aff-270f-4ac2-be1b-6cb5240dd6eb and a Batch Number of INS-PJ-025P2.

For further assistance and detailed information, you can consult the user manual available at https://example.com/manuals/inspiron-projector-pro2.pdf and review the privacy policy at https://example.com/privacy-inspiron.
`;
const FLYKEYS_LK03S_PIANO = {
    "brand": {
        "name": "Flykeys Instruments Group"
    },
    "manufacturer": {
        "name": "Flykeys Instruments Group",
        "url": "https://www.flykeys.com.my/"
    },
    "color": {
        "name": "Rosewood",
        "hex": "#8B4000"
    },
    "offers": {
        "warranty": {
            "durationOfWarranty": {
                "value": 1,
                "unitCode": "Y"
            },
            "warrantyScope": {
                "name": "Manufacturer Warranty"
            }
        },
        "price": 899.99,
        "priceCurrency": "USD",
        "availability": "InStock",
        "itemCondition": "NewCondition"
    },
    "productDimensions": {
        "value": "48 x 14 x 10 inches",
        "unitText": "inches"
    },
    "weight": {
        "value": 30,
        "unitText": "kg"
    },
    "_id": "67c50945064bec09de24f0d8",
    "name": "Flykeys LK03S Digital Piano",
    "url": "https://www.flykeys.com.my/product/flykeys-lk03s-digital-piano/",
    "image": [
        "https://www.flykeys.com.my/images/flykeys-lk03s-digital-piano-front.jpg",
        "https://www.flykeys.com.my/images/flykeys-lk03s-digital-piano-side.jpg"
    ],
    "description": "The Flykeys LK03S Digital Piano – a state-of-the-art instrument designed for those who demand authentic sound and expressive performance. This digital piano, available at https://www.flykeys.com.my/product/flykeys-lk03s-digital-piano/, is crafted by Flykeys Instruments Group and is perfect for musicians, music enthusiasts, and students alike.",
    "categories": [
        "Musical Instruments",
        "Digital Pianos"
    ],
    "tags": [
        "authentic sound",
        "responsive",
        "touch sensitive",
        "portable",
        "high-quality"
    ],
    "audience": [
        "musicians",
        "music enthusiasts",
        "students"
    ],
    "productionDate": "2025-01-15T00:00:00.000Z",
    "additionalProperty": [
        {
            "name": "Polyphony",
            "value": "256-note",
            "_id": "67c50945064bec09de24f0d9"
        },
        {
            "name": "Sound Technology",
            "value": "Harmonic Imaging sound technology, Schimmel German Grand piano sound, 88 keys stereo sampling",
            "_id": "67c50945064bec09de24f0da"
        },
        {
            "name": "Dynamic Settings",
            "value": "default soft, standard, heavy, off dynamic valve settings",
            "_id": "67c50945064bec09de24f0db"
        },
        {
            "name": "Connectivity",
            "value": "USB MIDI, Bluetooth Audio",
            "_id": "67c50945064bec09de24f0dc"
        },
        {
            "name": "Additional Functions",
            "value": "Metronome, Transpose, Dual Split, Reverb",
            "_id": "67c50945064bec09de24f0dd"
        },
        {
            "name": "Stereo System",
            "value": "25w",
            "_id": "67c50945064bec09de24f0de"
        }
    ],
    "ownershipHistory": [],
    "repairHistory": [],
    "identity": [
        {
            "type": "GTIN",
            "value": "9279192748",
            "_id": "67c50945064bec09de24f0df"
        },
        {
            "type": "Batch Number",
            "value": "FK01-LK03S-001",
            "_id": "67c50945064bec09de24f0e0"
        },
        {
            "type": "did",
            "value": "did:uminai:935bd477-82f0-43e1-acf0-6b618f5e13a3",
            "_id": "67c50945064bec09de24f0e1"
        }
    ],
    "manual": "https://example.com/manuals/flykeys-lk03s-digital-piano.pdf",
    "privacyPolicy": "https://example.com/privacy-flykeys",
};
const FLYKEYS_LK03S_PIANO_UNSTRUCTURED = `
The product did identifier is: did:uminai:935bd477-82f0-43e1-acf0-6b618f5e13a3
Introducing the Flykeys LK03S Digital Piano – a state-of-the-art instrument designed for those who demand authentic sound and expressive performance. This digital piano, available at https://www.flykeys.com.my/product/flykeys-lk03s-digital-piano/, is crafted by Flykeys Instruments Group and is perfect for musicians, music enthusiasts, and students alike.

With its striking design showcased through high-quality images from both the front and side perspectives, the Flykeys LK03S Digital Piano not only delivers an exceptional playing experience but also makes an impressive statement in any room. The piano is presented in a beautiful Rosewood finish, combining the warm richness of Rosewood (#8B4000)

Engineered for excellence, this instrument offers an authentic musical experience with 88 keys that respond with superior touch sensitivity. It features 256-note polyphony and a rich sound library that includes multiple high-quality instrument voices. The Flykeys LK03S leverages cutting-edge sound technology – including Harmonic Imaging sound technology and the renowned Schimmel German Grand piano sound – enhanced by 88 keys stereo sampling with a nuanced mix of default soft, standard, heavy, and off dynamic valve settings.

Adding to its advanced sound capabilities, this digital piano comes equipped with a suite of additional functions: USB MIDI connectivity, Bluetooth Audio for wireless integration, a built-in Metronome for practice, Transpose functionality to adapt the pitch to your liking, Dual Split to play different sounds simultaneously, and a Reverb effect to enrich your music. Complementing these features is a robust 25w stereo system that ensures powerful, clear sound reproduction.

The instrument is categorized under Musical Instruments and Digital Pianos, and it is associated with tags such as “authentic sound,” “responsive,” “touch sensitive,” “portable,” and “high-quality.” Its design and functionality are aimed at meeting the demands of serious musicians and modern performers, while still being accessible to students and enthusiasts.

Manufactured on January 15, 2025, the Flykeys LK03S Digital Piano is offered at a competitive price of $899.99 USD. It is available in new condition and in stock, supported by a 1-year manufacturer warranty under the “Manufacturer Warranty” scope, which gives you confidence in its reliability and long-term performance.

Measuring 48 x 14 x 10 inches and weighing 30 kg, this digital piano is designed to be both compact and robust, making it an excellent choice for performance spaces and home studios alike. Among its additional properties, you’ll note that it has an 88-key layout, 256-note polyphony, and an extensive sound library. The sound technology and additional functions, including USB MIDI, Bluetooth Audio, Metronome, Transpose, Dual Split, and Reverb, further distinguish its capability to deliver a dynamic and engaging musical performance. Moreover, the built-in 25w stereo system ensures that every note resonates with clarity.

For product identification, the Flykeys LK03S Digital Piano carries a GTIN of 9279192748 and a Batch Number of FK01-LK03S-001. Further details, including comprehensive instructions, can be found in the user manual at https://example.com/manuals/flykeys-lk03s-digital-piano.pdf, while the privacy policy is available at https://example.com/privacy-flykeys. At this time, no additional custom properties have been defined.

Every detail of the Flykeys LK03S Digital Piano has been carefully engineered and documented to ensure a superior musical experience that meets the needs of professionals and enthusiasts alike. Enjoy an instrument that blends innovative technology with classic design for an unparalleled performance experience.
`;
const MISTRAL_PROMPT = `
  You are a unstructured product data transformation to json specialist. You identify every aspect of the product info such as brand, manufacturer, color, offers, product dimensions, weight, additional properties, audience, categories, custom properties, description, identity, image, manual, name, ownership history, privacy policy, production date, repair history, tags, url.
  Your task is to process the user unstructured data into json structured data by respecting the datatypes mongodb schema ${product_schema_1.IProductTypes}. Your json output will be read from user's long text unstructred input from <<<>>>.
`;
exports.MISTRAL_PROMPT = MISTRAL_PROMPT;
const MISTRAL_SYSTEM_PROMPT = `
  You are a unstructured data transformation to json specialist. Your task is to access the user intent and transform the unstructured data into json structured data. The user has provided you with a long text ustructured that describes a product. Your output should cover every aspect of the long text unstructred to json by respecting the mongodb schema datatypes ${product_schema_1.IProductTypes}.
`;
exports.MISTRAL_SYSTEM_PROMPT = MISTRAL_SYSTEM_PROMPT;
const MISTRAL_LLM_CLASSIFICATION_EXAMPLE = `
  ####
  Here are some examples you must understand:
  User Input: ${RV_REFRIGERATOR_UNSTRUCTURED}
  Your JSON Output: ${RV_REFRIGERATOR}
  User Input: ${JENSEN_VACUUM_V3_UNSTRUCTURED}
  Your JSON Output: ${JENSEN_VACUUM_V3}
  User Input: ${INSPIRON_PROJECTOR_PRO_V2_UNSTRUCTURED}
  Your JSON Output: ${INSPIRON_PROJECTOR_PRO_V2}
  User Input: ${FLYKEYS_LK03S_PIANO_UNSTRUCTURED}
  Your JSON Output: ${FLYKEYS_LK03S_PIANO}

  Additional Instructions:
  1. Must respect the datatypes and object properties naming following mongodb schema ${product_schema_1.IProductTypes} strictly
  2. Do not put any comments in the JSON output
  3. Understand the text and know the properties to extract
  4. Understood the product's audience and who it is for
  5. Carefully extract the product's categories and tags
  6. Carefully extract the additional properties if any, where the name and value are important, name should be a key title that describes the value e.g.: name: "Polyphony" describe value: "256-note"

  <<<
    User Input: {insert}
  >>>
`;
exports.MISTRAL_LLM_CLASSIFICATION_EXAMPLE = MISTRAL_LLM_CLASSIFICATION_EXAMPLE;
const constructUserPrompt = (text) => {
    return [{
            role: "user",
            content: `
      ${MISTRAL_PROMPT}
      ${MISTRAL_LLM_CLASSIFICATION_EXAMPLE.replace("{insert}", text)}
    `
        }];
};
exports.constructUserPrompt = constructUserPrompt;
const MESSAGES_WITH_ASSISTANT = [{
        role: 'system',
        content: MISTRAL_SYSTEM_PROMPT
    }, {
        role: 'user',
        content: RV_REFRIGERATOR_UNSTRUCTURED
    }, {
        role: 'assistant',
        content: RV_REFRIGERATOR
    }, {
        role: 'user',
        content: JENSEN_VACUUM_V3_UNSTRUCTURED
    }, {
        role: 'assistant',
        content: JENSEN_VACUUM_V3,
    }];
exports.MESSAGES_WITH_ASSISTANT = MESSAGES_WITH_ASSISTANT;
