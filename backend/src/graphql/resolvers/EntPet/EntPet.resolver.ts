import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Service } from 'typedi';

import { EntPet } from '@src/graphql/entities';
import { PaginationInput } from '@src/graphql/inputs/PaginateEntity/PaginationInput';
import { EntPetService } from '@src/services';

import CreateEntPetData from './inputs/CreateEntPetData';
import EntPetFilters from './inputs/EntPetFiltersData';
import UpdateEntPetData from './inputs/UpdateEntPetData';
import { PaginatedPetsResponse } from './outputs/EntPetPagination';

@Service()
@Resolver()
class EntPetResolver {
  constructor(private readonly petService: EntPetService) {}

  @Query(() => EntPet)
  async pet(@Arg('id') id: string) {
    try {
      const shop = await this.petService.getPetByID(id);

      return shop;
    } catch (error) {
      throw new Error(`Something went wrong: ${error}`);
    }
  }

  @Query(() => PaginatedPetsResponse)
  async pets(
    @Arg('pagination', { nullable: true }) pagination?: PaginationInput,
    @Arg('filters', { nullable: true }) filters?: EntPetFilters
  ) {
    try {
      const paginatedPetsResponse = await this.petService.getPets(
        pagination,
        filters
      );

      return paginatedPetsResponse;
    } catch (error) {
      throw new Error(`Something went wrong: ${error}`);
    }
  }

  @Mutation(() => EntPet)
  async createPet(@Arg('data') data: CreateEntPetData) {
    try {
      const pet = await this.petService.createPet(data);

      return pet;
    } catch (error) {
      throw new Error(`Something went wrong: ${error}`);
    }
  }

  @Mutation(() => EntPet)
  async updatePet(@Arg('data') data: UpdateEntPetData) {
    try {
      const pet = await this.petService.updatePet(data);

      return pet;
    } catch (error) {
      throw new Error(`Something went wrong: ${error}`);
    }
  }

  @Mutation(() => Boolean)
  async deletePet(@Arg('id') id: string) {
    try {
      const petDeleted = this.petService.deletePet(id);

      return petDeleted;
    } catch (error) {
      throw new Error(`Something went wrong: ${error}`);
    }
  }
}

export default EntPetResolver;
