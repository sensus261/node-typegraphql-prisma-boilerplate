import { InputType, Field } from 'type-graphql';

@InputType()
export class PaginationInput {
  @Field()
  first: number;

  @Field()
  after: number;
}
