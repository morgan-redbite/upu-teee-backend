import OpenAI from "openai";

interface IOpenAIAPIInterface {
  apiKey?: string;
  baseURL?: string;
}

/** OpenAI client customised for the project
 * @param {string} apiKey - OpenAI API key
 * @param {string | undefined} baseURL - OpenAI base URL
**/
const openAiClient = ({
  apiKey,
  baseURL
}: IOpenAIAPIInterface) => {
  return new OpenAI({
    apiKey,
    baseURL: baseURL ?? null,
  })
};

export {
  openAiClient
}