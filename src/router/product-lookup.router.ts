import { Router } from "express";
import { getFullManufacturerProductByAggregateSearchLike } from "../services/manufacturer/manufacturer-product.service";

const ProductLookupRouter = Router();

ProductLookupRouter.get("/", async (req, res) => {
  try {
    const { anyId } = req.query;
    if (!anyId) {
      res.status(400).json({ error: "Product ID is required" });
    }
    const result = await getFullManufacturerProductByAggregateSearchLike(anyId as string);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

export default ProductLookupRouter;