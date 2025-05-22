module.exports = {
    app: {
      port: process.env.PORT || 5000,
      env: process.env.NODE_ENV || 'development',
    },
    db: {
      host: process.env.DB_HOST || 'localhost',
      name: process.env.DB_NAME || 'mydb',
      user: process.env.DB_USER || 'myuser',
      password: process.env.DB_PASSWORD || 'mypassword',
      port: process.env.DB_PORT || 5432,
    },
    auth: {
      jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
      tokenExpiration: process.env.JWT_EXPIRES_IN || '1h',
    },
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
    },
  };
  