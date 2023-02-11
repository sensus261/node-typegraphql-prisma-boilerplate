import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import BaseEntity from '../mixins/BaseEntity';

@Entity()
@ObjectType()
export class EntPet extends BaseEntity {
  @Field(() => String)
  @Column({ type: 'text' })
  name: string;

  @Field(() => String)
  @Column({ type: 'text' })
  age: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  breed?: string;
}
