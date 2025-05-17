import { Router } from "express";
import { authenticatePrivy } from "../services/external/Privy";
import { PrivyAuthPayload } from "../../types/express";
import { registerOrGetManufacturer, updateManufacturerProfile } from "../services/manufacturer/manufacturer-profile.service";
import { addManufacturerProduct, getFullManufacturerProduct, getManufacturerProductbyId, getManufacturerProducts } from "../services/manufacturer/manufacturer-product.service";
import { addManufacturerProductImages, getManufacturerProductImages } from "../services/manufacturer/manufacturer-product-images.service";
import { addManufacturerProductSupportingDocs, getManufacturerProductSupportingDocs } from "../services/manufacturer/manufacturer-product-supporting-docs.service";

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

ManufacturerRouter.get("/products", authenticatePrivy, async (req, res) => {
  try {
    const manufacturerId = req.privyUser?.sub;
    if (!manufacturerId) {
      throw 'Unauthorized';
    }
    const result = await getManufacturerProducts(manufacturerId);
    res.json({
      message: "Products",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      message: error
    });
  }
});

ManufacturerRouter.get("/product/:productId", authenticatePrivy, async (req, res) => {
  try {
    const manufacturerId = req.privyUser?.sub;
    if (!manufacturerId) {
      throw 'Unauthorized';
    }

    const productId = req.params.productId;
    if (!productId) {
      throw 'Product ID is required';
    };
    const result = await getManufacturerProductbyId(manufacturerId, productId);
    res.json({
      message: "Get by ProductId",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      message: error
    });
  }
});

ManufacturerRouter.post("/add-product", authenticatePrivy, async (req, res) => {
  try {
    const manufacturerId = req.privyUser?.sub;
    if (!manufacturerId) {
      throw 'Unauthorized';
    }

    const payload = {
      ...req.body,
      manufacturerId: manufacturerId
    }
    const result = await addManufacturerProduct(payload);
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

ManufacturerRouter.get("/get-product-images", authenticatePrivy, async (req, res) => {
  try {
    const manufacturerId = req.privyUser?.sub;
    if (!manufacturerId) {
      throw 'Unauthorized';
    }

    const productId = req.query.productId;
    if (!productId) {
      throw 'Product ID is required';
    };

    const result = await getManufacturerProductImages(productId as string);

    res.json({
      message: "Get Product Images",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      message: error
    });
  }
});

ManufacturerRouter.post("/set-product-images", authenticatePrivy, async (req, res) => {
  try {
    const manufacturerId = req.privyUser?.sub;
    if (!manufacturerId) {
      throw 'Unauthorized';
    }

    const productId = req.body.productId;
    if (!productId) {
      throw 'Product ID is required';
    };
    const images = req.body.images;
    if (!images || images.length === 0) {
      throw 'Product images are required';
    };

    const payload = {
      productId: req.body.productId,
      images: req.body.images,
    };
    const result = await addManufacturerProductImages(payload);

    res.json({
      message: "Set Product Images",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      message: error
    });
  }
});

ManufacturerRouter.get("/get-product-supporting-documents", authenticatePrivy, async (req, res) => {
  try {
    const manufacturerId = req.privyUser?.sub;
    if (!manufacturerId) {
      throw 'Unauthorized';
    }

    const productId = req.query.productId;
    if (!productId) {
      throw 'Product ID is required';
    };

    const result = await getManufacturerProductSupportingDocs(productId as string);

    res.json({
      message: "Get Product Supporting Docs",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      message: error
    });
  }
});

ManufacturerRouter.post("/set-product-supporting-documents", authenticatePrivy, async (req, res) => {
  try {
    const manufacturerId = req.privyUser?.sub;
    if (!manufacturerId) {
      throw 'Unauthorized';
    }

    const productId = req.body.productId;
    if (!productId) {
      throw 'Product ID is required';
    };
    const supportingDocs = req.body.supportingDocs;
    if (!supportingDocs || supportingDocs.length === 0) {
      throw 'Product supporting docs are required';
    };

    const payload = {
      productId: req.body.productId,
      supportingDocs: req.body.supportingDocs,
    };
    const result = await addManufacturerProductSupportingDocs(payload);

    res.json({
      message: "Set Product Supporting Docs",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      message: error
    });
  }
});

ManufacturerRouter.get("/get-product", authenticatePrivy, async (req, res) => {
  try {
    const manufacturerId = req.privyUser?.sub;
    if (!manufacturerId) {
      throw 'Unauthorized';
    }
    const productId = req.query.productId;
    if (!productId) {
      throw 'Product ID is required';
    };

    const result = await getFullManufacturerProduct(productId as string);
    res.status(200).json({
      message: "Get Product By Id",
      result: result,
    });

  } catch (error) {
    res.status(400).json({
      message: error
    });
  }
})

export default ManufacturerRouter;