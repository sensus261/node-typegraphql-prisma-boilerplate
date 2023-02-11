import { ObjectType } from 'type-graphql';

import { EntPet } from '@src/entities';
import { PaginatedEntityResponse } from '@src/graphql/outputs/PaginatedEntity/PaginatedEntityOutput';

@ObjectType()
export class PaginatedPetsResponse extends PaginatedEntityResponse(EntPet) {}
