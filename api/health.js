// Simple health check API endpoint for Vercel serverless function
export default function handler(req, res) {
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
} 