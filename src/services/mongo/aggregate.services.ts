import ProductModel from "../../database/schema/product.schema";
import { openAiClient } from "../openai";

export const aggregateResult = async (query: string) => {
  try {
    const agg = [
      {
        $search: {
          text: {
            query: query,
            path: {
              wildcard: "*",
            }
          },
        },
      }
    ];
    const cursor = await ProductModel.aggregate(agg);
    return cursor
  } catch (error) {
    console.error('Error in queryChatbotMongoose:', error);
  }
};

export const queryChatbotMongoose = async (query: string) => {
  try {
    const agg = [
      {
        $search: {
          text: {
            query: query,
            path: {
              wildcard: "*",
            }
          },
        },
      }
    ];
    const cursor = await ProductModel.aggregate(agg);

    const message = await fromQueryToTextAgent(cursor, query);
    return message
  } catch (error) {
    console.error('Error in queryChatbotMongoose:', error);
  }
};

const userPrompt = `
You are a query result-to-text agent that converts JSON query results into plain text. 
The user's question is "{question}". Based on the following query result: {queryResult}, extract and describe the relevant information in a single paragraph with no markdown formatting, no newline characters, and no escape sequences (for example, do not output " with a backslash). 
Your answer should be descriptive, polite, and helpful. If you need more details, ask the user for clarification.
`

const fromQueryToTextAgent = async (query: any[], userQuestion: string) => {
  try {
    const client = openAiClient({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_API_URL
    });

    const output = await client.chat.completions.create({
      // you can specify the model you want to use
      model: 'qwen/qwen2.5-7b-instruct',
      messages: [{
        role: 'user',
        content: userPrompt.replace('{question}', userQuestion).replace('{queryResult}', JSON.stringify(query))
      }],
      temperature: 0,
    });

    return output.choices[0].message.content;
  } catch (error) {
    console.error('Error [fromQueryToTextAgent]:', error);
  }
}