import 'reflect-metadata';

import { registerEnumType } from 'type-graphql';

export enum UpdateOperation {
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

registerEnumType(UpdateOperation, {
  name: 'UpdateOperation',
  description: 'The update operation of a field',
});
