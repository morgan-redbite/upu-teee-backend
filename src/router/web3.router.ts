import e, { Router } from "express";
import { generateDIDDocumet, uploadDIDDocument } from "../services/web3/uDID";
import DIDIndexerModel from "../database/schema/did-indexer.schema";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/generate-udid", async (req, res) => {
  const result = await generateDIDDocumet();
  res.json({
    result,
  });
});

router.post("/index-udid", async (req, res) => {
  try {
    const data = req.body;
    if (data.udid && data.owner) {
      await DIDIndexerModel.create(data);
      res.json({
        message: "Success",
      });
    } else {
      res.status(400).json({
        message: "Missing uDID or owner",
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    })
  }
});

router.get("/get-udids", async (req, res) => {
  try {
    if (!req.query.ownerAddress) {
      res.status(400).json({
        message: "Missing ownerAddress",
      });
    } else {
      const result = await DIDIndexerModel.find({
        owner: req.query.ownerAddress,
      });

      // udid arrays
      const udidArray = result.map(item => item.udid);
      res.json({
        result: udidArray,
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

const Web3Router = router;
export default Web3Router;