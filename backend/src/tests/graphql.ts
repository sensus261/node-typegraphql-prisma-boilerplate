import { graphql, GraphQLSchema, ExecutionResult } from 'graphql';
import { buildSchema } from 'type-graphql';

type Maybe<T> = null | undefined | T;

interface GraphQLCallOptions {
  source: string;
  variableValues?: Maybe<{
    [key: string]: unknown;
  }>;
  rootValue?: unknown;
}

let schema: GraphQLSchema;

export const graphQLCall = async ({
  source,
  variableValues,
  rootValue,
}: GraphQLCallOptions): Promise<ExecutionResult> => {
  if (!schema) {
    schema = await buildSchema({
      resolvers: [`${__dirname}/../graphql/resolvers/index.ts`],
    });
  }

  return graphql({
    schema,
    source,
    variableValues,
    rootValue,
  });
};

export const gql = (str: TemplateStringsArray): string => str.raw[0];
