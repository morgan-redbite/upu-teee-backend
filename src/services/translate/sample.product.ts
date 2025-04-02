export const sampleJson = [{
  "@context": {
    "uDPD": "https://example.org/udpd#",
    "schema": "https://schema.org/"
  },
  "@type": "schema:decentralisedProductData",
  "did": "did:uminai:refrigerator-unique-id",
  "product": {
    "@type": "Product",
    "name": "Refrigerator",
    "identifier": [{
        "@type": "UPC",
        "value": "RF-UPC-123456789"
      }, {
        "@type": "SKU",
        "value": "RF-SKU-987654321"
      }, {
        "@type": "GTIN",
        "value": "9506000134352"
    }],
    "description": "A refrigerator is a kitchen appliance that is used to store food and keep it cool.",
    "material": "High-grade Plastic",
    "weight": "200 g",
    "manufacturer": {
      "@type": "schema:Organization",
      "name": "FreeezeIt Co.",
      "location": "Germany"
    },
    "productionInfo": {
      "batchNumber": "RC-AB02",
      "productionDate": "2025-01-15",
      "expiryDate": "2030-01-15",
      "certifications": [
        "ISO9001",
        "Recyclable"
      ],
      "origin": "Germany"
    },
    "category": [
      "Storage",
      "Household",
      "Kitchen",
      "Appliance",
      "Refrigerator",
      "Cooling",
    ],
    "color": "Silver",
    "usageInstructions": [{
      "@type": "schema:HowTo",
      "name": "How to Use the Refrigerator",
      "step": [
        {
          "name": "Step 1",
          "text": "Plug in the refrigerator and turn it on."
        },
        {
          "name": "Step 2",
          "text": "Adjust the temperature settings to your desired level."
        },
        {
          "name": "Step 3",
          "text": "Place your food items inside the refrigerator, making sure to organize them properly."
        },
        {
          "name": "Step 4",
          "text": "Close the refrigerator door securely to keep the contents cool."
        },
        {
          "name": "Step 5",
          "text": "Check the temperature regularly to ensure the refrigerator is working properly."
        }
      ]
    }]
  }
}, {
  "@context": {
    "uDPD": "https://example.org/udpd#",
    "schema": "https://schema.org/"
  },
  "@type": "schema:decentralisedProductData",
  "did": "did:uminai:container-unique-id",
  "product": {
    "@type": "schema:Product",
    "name": "Container",
    "identifier": "CONTAINER-UPC-123456789",
    "description": "A durable storage container designed for everyday use.",
    "material": "High-grade Plastic",
    "dimensions": {
      "length": "10 cm",
      "width": "10 cm",
      "height": "10 cm"
    },
    "weight": "200 g",
    "manufacturer": {
      "@type": "schema:Organization",
      "name": "Container Co.",
      "location": "USA"
    },
    "productionInfo": {
      "batchNumber": "C-001",
      "productionDate": "2025-01-15",
      "expiryDate": "2030-01-15",
      "certifications": [
        "ISO9001",
        "Recyclable"
      ],
      "origin": "USA"
    },
    "uPI:generalization": [
      "PhysicalProduct",
      "DurableGood",
      "StorageSolution"
    ],
    "category": [
      "Storage",
      "Household"
    ],
    "color": "Blue",
    "usageInstructions": [{
      "@type": "schema:HowTo",
      "name": "How to Use the Container",
      "step": [
        {
          "@type": "schema:HowToStep",
          "text": "Ensure the container is empty and clean before use."
        },
        {
          "@type": "schema:HowToStep",
          "text": "Open the container by lifting the lid slowly."
        },
        {
          "@type": "schema:HowToStep",
          "text": "Place your items inside, making sure to organize them properly."
        },
        {
          "@type": "schema:HowToStep",
          "text": "Close the lid securely to keep the contents safe."
        },
        {
          "@type": "schema:HowToStep",
          "text": "Store the container in a cool, dry place to maintain its condition."
        }
      ]
    }]
  }
}]

export const sampleQuestion = {
  "@context": {
    "dpd": "https://example.org/udpd#",
    "schema": "https://schema.org/"
  },
  "@type": "schema:decentralisedProductData",
  "did": "did:uminai:xenova-pro1-unique-id",
  "product": {
    "@type": "schema:Product",
    "name": "Xenova Pro1",
    "identifier": "XEN-PRO1-UPC-987654321",
    "description": "Xenova Pro1 is a cutting-edge smartphone featuring an advanced display, powerful processor, and high-resolution camera for an exceptional user experience.",
    "material": "Aluminum frame with Gorilla Glass",
    "dimensions": {
      "length": "15.2 cm",
      "width": "7.5 cm",
      "height": "0.8 cm"
    },
    "weight": "180 g",
    "manufacturer": {
      "@type": "schema:Organization",
      "name": "Xenova Inc.",
      "location": "South Korea",
      "contact": [
        {
          "@type": "schema:ContactPoint",
          "contactType": "customer service",
          "telephone": "+1-800-123-4567",
          "email": "support@xenova.com"
        }
      ]
    },
    "productionInfo": {
      "batchNumber": "XP-2025-01",
      "productionDate": "2025-02-01",
      "warranty": "1 year",
      "certifications": [
        "FCC",
        "CE"
      ],
      "origin": "South Korea"
    },
    "uPI:generalization": [
      "MobileDevice",
      "Electronics",
      "Smartphone"
    ],
    "category": [
      "Electronics",
      "Smartphone",
      "Mobile"
    ],
    "color": "Midnight Black",
    "usageInstructions": {
      "@type": "schema:HowTo",
      "name": "How to Use the Xenova Pro1 Smartphone",
      "step": [
        {
          "@type": "schema:HowToStep",
          "text": "Press and hold the power button for 2 seconds to turn on the smartphone."
        },
        {
          "@type": "schema:HowToStep",
          "text": "Swipe up on the lock screen to access the home screen."
        },
        {
          "@type": "schema:HowToStep",
          "text": "Navigate to the settings menu to configure Wi-Fi, Bluetooth, and other connectivity options."
        },
        {
          "@type": "schema:HowToStep",
          "text": "Download and install your desired apps from the app store."
        },
        {
          "@type": "schema:HowToStep",
          "text": "For optimal battery performance, adjust the screen brightness and enable battery-saving modes in settings."
        }
      ]
    }
  }
}
