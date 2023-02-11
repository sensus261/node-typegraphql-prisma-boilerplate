import { InputType, Field } from 'type-graphql';

import { UpdateOperation } from './UpdateOperation.enum';

export const NullableFieldUpdateInput = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldType: any
) => {
  @InputType({ isAbstract: true })
  abstract class OptionalUpdateEntityFieldClass {
    @Field(() => UpdateOperation)
    operation: UpdateOperation;

    @Field(fieldType ? () => fieldType : undefined)
    value: T;
  }

  return OptionalUpdateEntityFieldClass;
};

export const NonNullableFieldUpdateInput = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldType: any
) => {
  @InputType({ isAbstract: true })
  abstract class OptionalUpdateEntityFieldClass {
    @Field(fieldType ? () => fieldType : undefined)
    value: T;
  }

  return OptionalUpdateEntityFieldClass;
};
