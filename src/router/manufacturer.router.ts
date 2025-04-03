import { Router } from "express";
import { authenticatePrivy } from "../services/external/Privy";
import { PrivyAuthPayload } from "../../types/express";
import ManufacturerProfileModel from "../database/manufacturerSchema/manufacturerProfile.schema";
import { registerOrGetManufacturer, updateManufacturerProfile } from "../services/manufacturer/manufacturer-profile.service";
import { addManufacturerProduct } from "../services/manufacturer/manufacturer-product.service";

const ManufacturerRouter = Router();

interface AuthenticatedRequest extends Request {
  privyUser?: PrivyAuthPayload;
}
ManufacturerRouter.get("/", (req, res) => {
  res.send("Nothing to see");
});

ManufacturerRouter.post("/registerOrGet", authenticatePrivy, async (req, res) => {
  try {
    if (!req.privyUser) {
      throw 'Unauthorized';
    };

    const result = await registerOrGetManufacturer(req.privyUser);

    res.json({
      message: result
    });
  } catch (error) {
    res.status(400).json({
      message: error
    });
  }
});

ManufacturerRouter.post("/update-profile", authenticatePrivy, async (req, res) => {
  try {
    console.log(req.body);
    const result = updateManufacturerProfile(req.body);

    res.json({
      message: result
    });
  } catch (error) {
    res.status(400).json({
      message: error
    });
  }
});

ManufacturerRouter.post("/login", async (req, res) => {
  try {
    res.json({
      message: "Login"
    });
  } catch (error) {
    res.status(400).json({
      message: error
    });
  }
});

ManufacturerRouter.get("/products", async (req, res) => {
  try {
    res.json({
      message: "Products"
    });
  } catch (error) {
    res.status(400).json({
      message: error
    });
  }
});

ManufacturerRouter.post("/update-product", authenticatePrivy, async (req, res) => {
  try {
    const result = await addManufacturerProduct(req.body);
    res.json({
      message: "Add Product",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      message: error
    });
  }
});

export default ManufacturerRouter;