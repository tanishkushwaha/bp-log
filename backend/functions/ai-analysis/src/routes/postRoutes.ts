import OpenAI from 'openai';
import { readingsFormatter } from '../utils/readingsFormatter.js';
import readingsValidator from '../utils/readingsValidator.js';
import prompt from '../prompt.js';
import parseAiResponse from '../utils/parseAiResponse.js';

const postRoutes: Record<
  string,
  (req: any, res: any, log: any, error: any) => any
> = {};

export const handlePost = (
  path: string,
  handler: (req: any, res: any, log: any, error: any) => any
) => {
  postRoutes[path] = handler;
};

export const postHandler = (path: string) => postRoutes[path];

// ROUTES
handlePost('/analysis', async (req: any, res: any, log: any) => {
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

  try {
    const response = await openRouterClient.chat.completions.create({
      model: 'deepseek/deepseek-chat:free',
      messages: [
        {
          role: 'system',
          content: prompt,
        },
        {
          role: 'user',
          content: `Here is my blood pressure data from the past days:\n\n${readings}`,
        },
      ],
    });

    const aiResponse = response.choices[0].message.content;
    if (!aiResponse) throw new Error('Empty AI response');

    const parsedAiResponse = parseAiResponse(aiResponse);

    const finalResponseObject = {
      insights: parsedAiResponse.slice(0, 3),
      tips: parsedAiResponse.slice(3, 6),
    };

    return res.json({
      success: true,
      data: finalResponseObject,
      error: null,
    });
  } catch (e: any) {
    return res.json(
      {
        success: false,
        data: null,
        error: e.message,
      },
      500
    );
  }
});
