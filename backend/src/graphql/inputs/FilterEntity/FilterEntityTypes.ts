import { InputType } from 'type-graphql';

import { FilterEntityFieldInput } from './FilterEntityFieldInput';

@InputType()
export class StringFilterEntityFieldInput extends FilterEntityFieldInput<string>(
  String
) {}

@InputType()
export class StringListFilterEntityFieldInput extends FilterEntityFieldInput<
  string[]
>([String]) {}

@InputType()
export class NumberFilterEntityFieldInput extends FilterEntityFieldInput<number>(
  [Number]
) {}

@InputType()
export class DateFilterEntityFieldInput extends FilterEntityFieldInput<string>(
  Date
) {}
