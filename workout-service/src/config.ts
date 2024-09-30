// src/config.ts

export const dbConfig = {
  host: "postgres", // This should match the service name in docker-compose
  user: "user",
  password: "password",
  database: "gym_db",
};

export const jwtSecret = process.env.JWT_SECRET;
