import ProductModel, { IProduct } from "../../database/schema/product.schema";

export const createOrUpdateProductInformation = async (data: IProduct) => {
  try {
    // Extract the DID from the identity array.
    const did = data.identity.find(item => item.type.toLowerCase() === "did")?.value;
    if (!did) {
      throw new Error("No DID provided in the product identity.");
    }

    // Find the existing product by DID.
    const existingProduct = await ProductModel.findOne({
      identity: { $elemMatch: { type: "did", value: did } }
    });

    if (existingProduct) {
      // Merge customProperties: preserve existing values and override with new ones.
      const mergedCustomProperties = {
        ...existingProduct.customProperties,
        ...data.customProperties
      };

      // Assign merged properties back to data.
      data.customProperties = mergedCustomProperties;

      // Update the document using $set operator.
      const result = await ProductModel.updateOne(
        { identity: { $elemMatch: { type: "did", value: did } } },
        { $set: data },
        { upsert: true }
      );

      console.log("Update result:", result);
      return result;
    } else {
      // If no document exists, create a new one.
      const result = await ProductModel.create(data);
      console.log("Created new product:", result);
      return result;
    }
  } catch (error) {
    console.error("Error in createOrUpdateProductInformation:", error);
    throw error;
  }
};


export const getDPDByDID = async (did: string) => {
  try {
    const isFound = await ProductModel.findOne({
      identity: { 
        $elemMatch: { 
          type: { $regex: /^did$/, $options: "i" }, // Case-insensitive match for "did"
          value: did 
        } 
      }
    });

    if (!isFound) {
      throw new Error("No product found with the provided DID.");
    }

    const resultFromProductModel = await ProductModel.findOne({
      identity: { $elemMatch: { type: "did", value: did } }
    });

    if (!resultFromProductModel) throw new Error("No product found with the provided DID.");

    const { _id, __v, ...result } = resultFromProductModel.toObject();

    return result;
  } catch (error) {
    console.error("Error in getDPDByDID:", error);
    throw error;
  }
};