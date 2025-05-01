import { Client, Users } from 'node-appwrite';
import OpenAI from "openai";
import { config } from 'dotenv'
config()
import { generateMockBPData } from './utils/generateMockBPData.js';
import { readingsFormatter } from './utils/readingsFormatter.js';

const openRouterClient = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});


// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  // You can use the Appwrite SDK to interact with other services
  // For this example, we're using the Users service
  const appwriteClient = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');
  const users = new Users(appwriteClient);

  try {
    const response = await users.list();
    // Log messages and errors to the Appwrite Console
    // These logs won't be seen by your end users
    log(`Total users: ${response.total}`);
  } catch (err) {
    error("Could not list users: " + err.message);
  }

  if (req.method === 'GET') {
    switch (req.path) {
      case '/':
        return res.json({
          app: 'bp-log'
        });

      default:
        return res.json({ error: 'Not Found' }, 404)
    }
  }

  if (req.method === 'POST') {
    switch (req.path) {
      case '/analysis':
        if (!req.body?.data) return res.json({ error: 'Missing Data' }, 400)

        return res.json({
          data: req.body.data
        })

      case '/test':
        if (!req.body?.bpData) return res.json({ error: 'Missing BP data' }, 400)

        const readings = readingsFormatter(req.body.bpData)

        const response = await openRouterClient.chat.completions.create({
          model: "deepseek/deepseek-chat:free",
          messages: [
            { role: 'system', content: 'You are a helpful health assistant. Analyze the user’s blood pressure and pulse data and summarize trends or concerns in a clear, friendly way and in less than 50 words. Emphasize if the readings are not normal. Provide tips on maintaining a healthy blood pressure. Do not use markdown.' },
            { role: 'user', content: `Here is my blood pressure data from the past days:\n\n${readings}` }
          ],
        });

        const aiResponse = response.choices[0].message.content

        return res.json({ response: aiResponse, wordLength: aiResponse.split(" ").length });
    }
  }

  return res.json({ error: 'Method Not Allowed' }, 405)
};
