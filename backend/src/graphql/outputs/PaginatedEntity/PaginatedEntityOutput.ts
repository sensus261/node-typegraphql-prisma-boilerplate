import { Field, ObjectType, ClassType, Int } from 'type-graphql';

@ObjectType()
export class PageInfo {
  @Field(() => Boolean)
  hasNextPage: boolean;
}

@ObjectType()
export class Statistics {
  @Field(() => Int)
  count: number;
}

export const PaginatedEntityResponse = <T>(entity: ClassType<T>) => {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [entity])
    nodes: T[];

    @Field(() => PageInfo)
    pageInfo: PageInfo;

    @Field(() => Statistics)
    statistics: Statistics;
  }

  return PaginatedResponseClass;
};
