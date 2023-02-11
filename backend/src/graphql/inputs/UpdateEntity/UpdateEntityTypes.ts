import { InputType } from 'type-graphql';

import {
  NonNullableFieldUpdateInput,
  NullableFieldUpdateInput,
} from '@src/graphql/inputs/UpdateEntity/UpdateEntityFieldInput';

// Non-nullable types (for optional fields)
@InputType()
export class RequiredStringFieldUpdateInput extends NonNullableFieldUpdateInput<string>(
  String
) {}

@InputType()
export class RequiredNumberFieldUpdateInput extends NonNullableFieldUpdateInput<
  string[]
>([String]) {}

// Nullable types (for required fields)
@InputType()
export class NullableNumberFieldUpdateInput extends NullableFieldUpdateInput<number>(
  Number
) {}

@InputType()
export class NullableStringFieldUpdateInput extends NullableFieldUpdateInput<string>(
  String
) {}

@InputType()
export class NullableListStringFieldUpdateInput extends NullableFieldUpdateInput<
  string[]
>([String]) {}
