import { IsDate } from 'class-validator';
import { ObjectType, Field, ID } from 'type-graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
@ObjectType()
class UniformBaseEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date', { default: new Date() })
  @IsDate()
  createdAt: Date;

  @Column('date', { default: new Date() })
  @IsDate()
  updatedAt: Date;
}

export default UniformBaseEntity;
