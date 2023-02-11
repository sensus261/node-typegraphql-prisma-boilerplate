import { IsOptional } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
class CreateEntPetData {
  @Field(() => String)
  name: string;

  @Field(() => String)
  age: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  breed?: string;
}

export default CreateEntPetData;
