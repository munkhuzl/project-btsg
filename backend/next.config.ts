module.exports = {
  reactStrictMode: true,
  // Ensure the PDF fonts/images are traced into the serverless function bundle.
  outputFileTracingIncludes: {
    '/api/graphql': ['./src/assets/**/*'],
  },
  async headers() {
    return [
      {
        source: '/api/graphql',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Authorization, Content-Type' },
        ],
      },
    ];
  },
  env: {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
  },
}