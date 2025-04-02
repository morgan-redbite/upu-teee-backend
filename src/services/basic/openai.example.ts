import OpenAI from "openai"

const openAiExample = async () => {
  try {
    const openAiClient = new OpenAI({
      baseURL: process.env.OPENAI_API_URL,
      apiKey: process.env.OPENAI_API_KEY,
    })

    const result = await openAiClient.models.list();

    // @ts-ignore
    const sampleGAI = await openAiClient.chat.completions.create({
      model: 'text2cypher',
      messages: [{
        role: 'system',
        content: 'You are a helpful assistant'
      },{
        role: 'user',
        content: 'What is the capital of France?'
      }]
    });

    console.log('sampleGAI', sampleGAI.choices[0].message.content);
  } catch (error) {
    console.error('Err', error);
  }
}

openAiExample();