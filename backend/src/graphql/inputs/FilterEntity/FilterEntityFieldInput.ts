import { InputType, Field } from 'type-graphql';

import { FilterOperation } from './FilterOperation.enum';

export const FilterEntityFieldInput = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldType: any
) => {
  @InputType({ isAbstract: true })
  abstract class FilterEntityFieldClass {
    @Field(() => FilterOperation)
    operation: FilterOperation;

    @Field(() => fieldType)
    value: T;
  }

  return FilterEntityFieldClass;
};
