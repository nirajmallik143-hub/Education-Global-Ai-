import type { IncomingMessage, ServerResponse } from 'http';

export default function handler(_req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      status: 'ok',
      appName: 'Sikshya Global AI',
      environment: 'Vercel Serverless',
      geminiEnabled: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    })
  );
}
