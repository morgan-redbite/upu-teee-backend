import { Router } from "express";
import { askProductAgent } from "../services/productAgent";

const ProductAgentRouter = Router();

ProductAgentRouter.post("/ask", async (req, res) => {
  try {
    const { questionString, productId } = req.body;

    if (!questionString || !productId) {
      throw "Missing question or product ID";
    }
    const result = await askProductAgent(questionString, productId);
    
    res.status(200).json({ 
      message: "Product Agent Service",
      result: result,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

export default ProductAgentRouter;