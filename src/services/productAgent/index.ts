import OpenAI from "openai";
import { getFullManufacturerProductByAggregateSearchLike, ManufacturerProductWithImagesAndDocs } from "../manufacturer/manufacturer-product.service"
import { openAiClient } from "../openai";

export const askProductAgent = async (question: string, productId: string) => {
  try {
    const result = await getFullManufacturerProductByAggregateSearchLike(productId);
    if (!result) {
      throw `Product with ID ${productId} does not exist`;
    }
    // console.log('askProductAgent result:', result);
    const answer = await productAgent(question, result);
    return answer;
  } catch (error) {
    console.error('Error in [askProductAgent]:', error);
    throw 'Product Id Not Found';
  }
}

const constructPrompt = (question: string, productResult: ManufacturerProductWithImagesAndDocs) => {
  return `
    You are an expert assistant helping users understand product details.

    Here is the product information (in JSON format):

    ${JSON.stringify(productResult, null, 2)}

    Now answer the following question based on the product info above:

    "${question}"
  `;
}

const productAgent = async (question: string, productResult: ManufacturerProductWithImagesAndDocs) => {
  try {
    // console.log('Product Agent Question:', question, productResult);
    const client = openAiClient({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_API_URL
    });

    const response = await client.chat.completions.create({
      model: 'qwen/qwen2.5-7b-instruct',
      messages: [
        {
          role: 'user',
          content: constructPrompt(question, productResult),
        },
      ],
      temperature: 0,
    });

    const result = response.choices[0].message.content;
    // console.log('Product Agent Response:', result);
    return result;
  } catch (error) {
    console.error('Error in [productAgent]:', error);
    throw 'Error in Product Agent';
  }
};