export const config = {
    jwtSecret: process.env.JWT_SECRET || 'jwtSecretKey123',
    usdaApiKey: process.env.USDA_API_KEY || '',
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '15'),
  };