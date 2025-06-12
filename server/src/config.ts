export const config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
  },
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
}; 