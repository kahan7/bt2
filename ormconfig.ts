import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
const AppDataSource = new DataSource({
  type: (process.env.DB_TYPE as 'mysql') || 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'Khang0988322869!',
  database: 'demo',
  migrations: ['src/database/migrations/*.ts'],
});

export default AppDataSource;
