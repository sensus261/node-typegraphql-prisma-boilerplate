import { IsOptional } from 'class-validator';
import { InputType, Field } from 'type-graphql';

import { StringFilterEntityFieldInput } from '@src/graphql/inputs/FilterEntity/FilterEntityTypes';

// Declare the actual input type
@InputType()
class EntPetFilters {
  @Field(() => String)
  name: StringFilterEntityFieldInput;

  @Field(() => String)
  age: StringFilterEntityFieldInput;

  @Field(() => String, { nullable: true })
  @IsOptional()
  breed?: StringFilterEntityFieldInput;
}

export default EntPetFilters;
