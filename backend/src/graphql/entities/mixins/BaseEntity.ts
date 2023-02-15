import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class BaseEntity {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
