import { Router } from "express";
import { createOrUpdateProductInformation, getDPDByDID } from "../services/mongo/query.services";
import { fromTextToJsonAgent } from "../services/translate";
import { aggregateResult, queryChatbotMongoose } from "../services/mongo/aggregate.services";
import ProductDescriptionrModel from "../database/schema/productDescription.schema";
import ProductModel from "../database/schema/product.schema";
const router = Router();

// POST /upsert to create or update a product information.
router.post("/upsert", async (req, res) => {
  try {
    const data = req.body;
    console.log('data', data);
    if (data.json && data.description && data.UDID) {
      const result = await createOrUpdateProductInformation(data.json);
      await ProductDescriptionrModel.create({
        udid: data.UDID,
        description: data.description
      });
      res.json({
        message: result,
      });
    } else {
      res.status(400).json({
        message: "Missing json or productDescription or UDID",
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

// GET / to get a product information by DID.
router.get("/", async(req, res) => {
  try {
    const did = req.query.did;
    const getJson = await ProductModel.findOne({
      identity: { $elemMatch: { type: "did", value: did } }
    });
    res.json({
      message: getJson,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

// POST /generate-to-json to convert text to JSON by leveraging the translation model.
router.post("/generate-to-json", async (req, res) => {
  try {
    const text = req.body;
    console.log('text', text);
    const result = await fromTextToJsonAgent(text);
    res.json({
      message: result,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
})

// GET /get-udpd to get a product information by DID.
router.get(`/get-udpd`, async (req, res) => {
  try {
    const udid = req.query.udid;
    console.log
    if (!udid) {
      throw new Error("No DID provided in the product identity.");
    }
    if (typeof udid !== 'string') {
      throw new Error("uDID must be a string.");
    }
    const result = await getDPDByDID(udid);
    res.json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

// GET /get-all-udpd to get all product information.
router.get('/get-all-udpd', async (req, res) => {
  try {
    const result = await ProductModel.find();
    res.json({
      result,
    });
  } catch (error) {
    console.error('Error in get-all-udpd:', error);
  }
})

// GET /query to get a product information by search.
router.get('/query', async (req, res) => {
  try {
    const search = req.query.search;
    if (!search) {
      throw "No search provided.";
    }
    if (typeof search !== 'string') {
      throw "Search must be a string.";
    }
    const result = await aggregateResult(search);
    res.json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

// POST /chat-product to chat with the product.
router.post('/chat-product', async (req, res) => {
  try {
    const question = req.body.question;
    if (!question) {
      throw "No question provided.";
    }
    const result = await queryChatbotMongoose(question);
    res.json({
      result,
    });
  } catch (error) {
    console.error('Error in test:', error);
    res.status(500).json({
      error,
    });
  }
});

const ProductRouter = router;
export default ProductRouter;