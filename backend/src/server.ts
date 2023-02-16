import { config } from 'dotenv';

import 'module-alias/register';
import App from './app';
import { validateEnv } from './utils';
import { EnvironmentMode } from './utils/validateEnv';

config({
  path: process.env.NODE_ENV === EnvironmentMode.TEST ? '.env.test' : '.env',
});

validateEnv();

const app = new App();

app.listen();
