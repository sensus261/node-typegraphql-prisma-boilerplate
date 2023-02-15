import { EntPet } from '@prisma/client';
import { ObjectType } from 'type-graphql';

import { EntPet as PetEntity } from '@src/graphql/entities';
import { PaginatedEntityResponse } from '@src/graphql/outputs/PaginatedEntity/PaginatedEntityOutput';

@ObjectType()
export class PaginatedPetsResponse extends PaginatedEntityResponse<EntPet>(
  PetEntity
) {}
