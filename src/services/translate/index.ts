import { ChatCompletionSystemMessageParam } from "openai/resources/index.mjs";
import { openAiClient } from "../openai";
import { sampleJson } from "./sample.product";
import { constructUserPrompt } from "./sample.jsonld";

const translateToReadable = async (text: string) => {
  try {
    const parsed = JSON.parse(text);
    return parsed;
  } catch (error) {
    return text;
  }
}

const outputExample = [{
  systemAnswer: `
    1. Product Module (ID: did:uminai:container-unique-id)
    2. Product Details
       - Name: Container
       - UPC Identifier: CONTAINER-UPC-123456789
       - Description: A durable storage container designed for everyday use.
       - Material: High-grade Plastic
       - Dimensions (all measurements in cm):
           - Length: 10
           - Width: 10
           - Height: 10
       - Weight: 200 g
       - Manufacturer Details
           - Name: Container Co.
           - Location: USA
       - Production Information
           - Batch Number: C-001
           - Production Date: January 15, 2025
           - Expiry Date: January 15, 2030
           - Certifications: ISO9001, Recyclable
           - Origin: USA
    3. Category
       - Generalization: PhysicalProduct, DurableGood, StorageSolution
       - Main Categories: Storage, Household
    4. Color: Blue
    5. Usage Instructions
        - How to Use the Container
          - Step 1: Ensure the container is empty and clean before use.
          - Step 2: Open the container by lifting the lid slowly.
          - Step 3: Place your items inside, making sure to organize them properly.
          - Step 4: Close the lid securely to keep the contents safe.
          - Step 5: Store the container in a cool, dry place to maintain its condition`,
  category: ['Storage', 'Household'],
}]

const systemMessage: ChatCompletionSystemMessageParam = {
  role: 'system',
  content: `As a JSON-LD Translator to human readable, you will understand the user's JSON-LD data and translate it into a format given.
    Additional Instructions:
    1. Remove any schema links and schema: prefixes.
    2. Respect the original order of the JSON-LD data.
    3. Respect the original structure of the JSON-LD data.
    4. Output just like the example.
  `
}

const systemMessageSample = [{
  userMessage: JSON.stringify(sampleJson[1]),
  systemAnswer: outputExample[0]
}, {
  userMessage: JSON.stringify(sampleJson[2]),
  systemAnswer: outputExample[0]
}]

const getExamplePrompt = (examples: any) => {
  let res = `Here are some examples of userMessage and the systemAnswer: \n`;
  let tmp = examples.map((ex) => `userMessage: ${ex.question} \nsystemAnswer: ${ex.answer} \n`);
  return res + tmp.join('');
}

const toSystemMessage = (content: string): ChatCompletionSystemMessageParam => {
  return { role: 'system', content: content };
}

const humanReadableAgent = async (question: any) => {
  try {
    const client = openAiClient({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_API_URL
    })

    const response = await client.chat.completions.create({
      // you can specify the model you want to use
      model: 'mistral:latest',
      messages: [
        systemMessage,
        toSystemMessage(getExamplePrompt(systemMessageSample)),
        {
          role: 'user',
          content: JSON.stringify(question)
        }],
      temperature: 0,
    });

    console.log('[LOG]:', response.choices[0].message.content);
  } catch (error) {
    console.error('Error [humanReadableAgent]:', error);
  }
}

const fromTextToJsonAgent = async (text: string) => {
  try {
    const client = openAiClient({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_API_URL
    })

    // @ts-ignore
    const response = await client.chat.completions.create({
      // you can specify the model you want to use
      model: 'qwen/qwen2.5-7b-instruct',
      // @ts-ignore
      messages: constructUserPrompt(text),
      temperature: 0
    });

    const result = response.choices[0].message.content;
    if (typeof result === 'string') {
      return JSON.parse(result);
    } else {
      return 'No result';
    }
  } catch (error) {
    console.error('Error [fromTextToJsonLd]:', error);
  }
}

export {
  humanReadableAgent,
  fromTextToJsonAgent
}

