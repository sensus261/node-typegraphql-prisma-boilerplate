import { IsOptional } from 'class-validator';
import { InputType, Field } from 'type-graphql';

import { StringFilterEntityFieldInput } from '@src/graphql/inputs/FilterEntity/FilterEntityTypes';

@InputType()
class EntPetFilters {
  @Field(() => String, { nullable: true })
  name?: StringFilterEntityFieldInput;

  @Field(() => String, { nullable: true })
  age?: StringFilterEntityFieldInput;

  @Field(() => String, { nullable: true })
  @IsOptional()
  breed?: StringFilterEntityFieldInput;
}

export default EntPetFilters;
