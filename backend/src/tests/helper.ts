import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config({
  path: '.env.test',
});

const { DB_TYPE, DB_PATH, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } =
  process.env;

const connectionOptions = {
  type: DB_TYPE,
  host: DB_PATH,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: ['src/entities/**/*.ts'],
  synchronize: true,
  logging: false,
} as DataSourceOptions;

const dataSource = new DataSource(connectionOptions);

export const initializeDatabase = async () => {
  await dataSource.initialize();
};

export const synchronizeDatabase = async () => {
  await dataSource.synchronize();
};

export const clearDatabase = async () => {
  await dataSource.dropDatabase();
};

export const clearAndDestroyDatabase = async () => {
  await dataSource.dropDatabase();
  await dataSource.destroy();
};
