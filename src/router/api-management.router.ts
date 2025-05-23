import { Router } from "express";
import { authenticatePrivy } from "../services/external/Privy";
import { createApiKey, getApiKey } from "../services/apikey";

const APIManagement = Router();

APIManagement.post("/create", authenticatePrivy, async (req, res) => {
  try {
    console.log("Creating API Key");
    const manufacturerId = req.privyUser?.sub;
    if (!manufacturerId) {
      throw 'Unauthorized';
    }
    // Call the function to create an API key
    const result = await createApiKey(manufacturerId);
    // Return the result
    res.json({
      message: "API Key Created",
      result: {
        id: result.id,
        apiKey: result.apiKey,
        createdAt: result.createdAt,
      }
    });
  } catch (error) {
    res.status(400).json({
      message: error,
      test: 'errorss',
    });
  }
});

APIManagement.get("/get", authenticatePrivy, async (req, res) => {
    try {
        console.log("Getting API Key");
        const manufacturerId = req.privyUser?.sub;
        if (!manufacturerId) {
            throw 'Unauthorized';
        }
        // Call the function to create an API key
        const result = await getApiKey(manufacturerId);
        if (!result) {
            throw 'API Key not found';
        }
        // Return the result
        res.json({
            message: "API Key Created",
            result: {
                id: result.id,
                apiKey: result.apiKey,
                createdAt: result.createdAt,
            }
        });
    } catch (error) {
        
    }
});

export default APIManagement;