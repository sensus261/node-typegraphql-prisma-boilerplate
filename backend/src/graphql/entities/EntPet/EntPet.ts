import { Field, ObjectType } from 'type-graphql';

import { BaseEntity } from '../mixins/BaseEntity';

@ObjectType()
export class EntPet extends BaseEntity {
  @Field(() => String)
  name: string;

  @Field(() => String)
  age: string;

  @Field(() => String, { nullable: true })
  breed?: string;
}
