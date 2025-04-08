import { Router } from "express";

const ProductAgentRouter = Router();

ProductAgentRouter.get("/", async (req, res) => {
  try {
    res.status(200).json({ 
      message: "Product Agent Service",
      result: "Product Agent Service is running",
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

export default ProductAgentRouter;