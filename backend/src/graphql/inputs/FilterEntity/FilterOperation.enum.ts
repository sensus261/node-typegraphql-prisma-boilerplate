import { registerEnumType } from 'type-graphql';

export enum FilterOperation {
  EQUALS = 'EQUALS',
  CONTAINS = 'CONTAINS',
}

registerEnumType(FilterOperation, {
  name: 'FilterOperation',
  description: 'The filter operation of a field',
});
