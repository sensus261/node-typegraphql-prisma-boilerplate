import { cleanEnv, port, str } from 'envalid';

export enum EnvironmentMode {
  DEV = 'development',
  TEST = 'test',
  PRODUCTION = 'production',
  STAGING = 'staging',
}

const validateEnv = (): void => {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: [
        EnvironmentMode.DEV,
        EnvironmentMode.TEST,
        EnvironmentMode.PRODUCTION,
        EnvironmentMode.STAGING,
      ],
    }),
    PORT: port(),
    DB_TYPE: str(),
    DB_PATH: str(),
    DB_PORT: port(),
    DB_PASSWORD: str(),
    DB_USER: str(),
    DB_NAME: str(),
    REDIS_HOST: str(),
  });
};

export default validateEnv;
