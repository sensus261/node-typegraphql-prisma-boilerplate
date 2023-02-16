import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import lusca from 'lusca';
import morgan from 'morgan';
import { buildSchema, BuildSchemaOptions } from 'type-graphql';
import { Container } from 'typedi';

import { EntPetResolver } from './graphql/resolvers';
import { logger, redis } from './utils';
import prisma from './utils/prisma';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.set('env', process.env.NODE_ENV);

    this.connectToTheDatabase();
    this.createRedisClient();
    this.initializeMiddlewares();
    this.initializeGraphQLServer();
    this.initializeNotFoundRoute();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      logger.info(
        `💜 App is running at http://localhost:${
          process.env.PORT
        } in ${this.app.get('env')} mode`
      );

      logger.info('Press CTRL-C to stop\n');
    });
  }

  private initializeMiddlewares() {
    this.app.use(compression());
    this.app.use(morgan('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(lusca.xframe('SAMEORIGIN'));
    this.app.use(lusca.xssProtection(true));
  }

  private initializeNotFoundRoute() {
    this.app.use(/^(?!\/api\/?$)/, function (req, res) {
      res
        .status(200)
        .send('<h2 style="text-align: center;">Not found! Nice try btw!</h2>');
    });
  }

  private async initializeGraphQLServer() {
    const resolvers: BuildSchemaOptions['resolvers'] = [EntPetResolver];

    const schema = await buildSchema({
      resolvers,
      container: Container,
    });

    const apolloServer = new ApolloServer({
      schema,
    });

    apolloServer.applyMiddleware({ app: this.app, path: '/api' });
  }

  private async connectToTheDatabase() {
    try {
      logger.info('💤 Connecting to postgres database using...');
      await prisma.$connect();
      logger.info('💜 Database connection successfull!');
    } catch (error) {
      logger.error(`❌ Database connection error: ${error}`);
      logger.error(error);
    }
  }

  private createRedisClient() {
    redis.create();
    redis.getClient.connect();
  }
}

export default App;
