import OpenAI from 'openai';
import { readingsFormatter } from '../utils/readingsFormatter.js';
import readingsValidator from '../utils/readingsValidator.js';

const postRoutes: Record<string, (req: any, res: any) => any> = {};

export const handlePost = (
  path: string,
  handler: (req: any, res: any) => any
) => {
  postRoutes[path] = handler;
};

export const postHandler = (path: string) => postRoutes[path];

// ROUTES
handlePost('/analysis', async (req: any, res: any) => {
  const validationRes = readingsValidator(req.body.bpData);

  if (validationRes.error)
    return res.json(
      {
        success: false,
        data: null,
        error: validationRes.error,
      },
      400
    );

  const readings = readingsFormatter(req.body.bpData);

  const openRouterClient = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const response = await openRouterClient.chat.completions.create({
    model: 'deepseek/deepseek-chat:free',
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful health assistant. Analyze the user’s blood pressure and pulse data and summarize trends or concerns in a clear, friendly way and in less than 50 words. Emphasize if the readings are not normal. Provide tips on maintaining a healthy blood pressure. Do not use markdown.',
      },
      {
        role: 'user',
        content: `Here is my blood pressure data from the past days:\n\n${readings}`,
      },
    ],
  });

  const aiResponse = response.choices[0].message.content;

  return res.json({
    success: true,
    data: aiResponse,
    wordLength: aiResponse?.split(' ').length,
    error: null,
  });
});
