import { MiddlewareFn } from 'type-graphql';

import { logger } from '@src/utils';
import { EnvironmentMode } from '@src/utils/validateEnv';

const isEnvironment = (
  allowedEnvironments: EnvironmentMode[]
): MiddlewareFn => {
  return (_, next) => {
    if (allowedEnvironments.includes(process.env.NODE_ENV as EnvironmentMode)) {
      return next();
    }

    const msg = `[isEnvironment] This operation is allowed only on the following environments: ${allowedEnvironments}`;

    logger.error(msg);
    throw new Error(msg);
  };
};

export default isEnvironment;
