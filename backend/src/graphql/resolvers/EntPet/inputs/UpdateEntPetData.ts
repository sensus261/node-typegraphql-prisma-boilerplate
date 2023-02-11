import { IsOptional } from 'class-validator';
import { InputType, Field } from 'type-graphql';

import {
  RequiredStringFieldUpdateInput,
  NullableStringFieldUpdateInput,
} from '@src/graphql/inputs/UpdateEntity/UpdateEntityTypes';

@InputType()
class UpdateEntPetData {
  @Field()
  id: string;

  @Field()
  name: RequiredStringFieldUpdateInput;

  @Field()
  age: RequiredStringFieldUpdateInput;

  @Field({ nullable: true })
  @IsOptional()
  breed?: NullableStringFieldUpdateInput;
}

export default UpdateEntPetData;
