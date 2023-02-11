import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import lusca from 'lusca';
import morgan from 'morgan';
import { buildSchema, BuildSchemaOptions } from 'type-graphql';
import { Container } from 'typedi';
import { DataSource, DataSourceOptions } from 'typeorm';

import { EntPet } from './entities';
import { EntPetResolver } from './graphql/resolvers';
import { logger, redis } from './utils';

class App {
  public app: express.Application;

  public dataSource: DataSource;

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
    const { DB_TYPE, DB_PATH, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } =
      process.env;

    const entities: DataSourceOptions['entities'] = [EntPet];

    const connectionOptions = {
      type: DB_TYPE,
      host: DB_PATH,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities,
      synchronize: true,
      logging: false,
    } as DataSourceOptions;

    logger.info(connectionOptions);

    try {
      logger.info(
        `💤 Connecting to database using driver '${DB_TYPE}' on host '${DB_PATH}' using port '${DB_PORT}'...`
      );
      this.dataSource = new DataSource(connectionOptions);
      await this.dataSource.initialize();
      logger.info('💜 Database connection successfull!');
    } catch (error) {
      logger.error(`❌ Database connection error: ${error}`);
    }
  }

  private createRedisClient() {
    redis.create();
    redis.getClient.connect();
  }
}

export default App;
