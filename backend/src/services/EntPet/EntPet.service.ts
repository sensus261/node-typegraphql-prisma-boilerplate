import { oneLine } from 'common-tags';
import { Service } from 'typedi';
import { FindOptionsWhere } from 'typeorm';

import { EntPet } from '@src/entities';
import { getStringFieldFilterOperator } from '@src/graphql/inputs/FilterEntity/utils/FieldFilterOperators';
import { PaginationInput } from '@src/graphql/inputs/PaginateEntity/PaginationInput';
import { UpdateOperation } from '@src/graphql/inputs/UpdateEntity/UpdateOperation.enum';
import CreateEntPetData from '@src/graphql/resolvers/EntPet/inputs/CreateEntPetData';
import EntPetFilters from '@src/graphql/resolvers/EntPet/inputs/EntPetFiltersData';
import UpdateEntPetData from '@src/graphql/resolvers/EntPet/inputs/UpdateEntPetData';
import { PaginatedPetsResponse } from '@src/graphql/resolvers/EntPet/outputs/EntPetPagination';

@Service()
class EntPetService {
  public async getPetByID(id: string): Promise<EntPet> {
    const pet = await EntPet.findOneOrFail({
      where: { id },
      relations: [],
    });

    return pet;
  }

  public async getPets(
    pagination?: PaginationInput,
    filters?: EntPetFilters
  ): Promise<PaginatedPetsResponse> {
    // Prepare find where options (filters) for TypeORM
    const whereOptions: FindOptionsWhere<EntPet> | FindOptionsWhere<EntPet>[] =
      {};

    if (filters) {
      try {
        // Handle name (string) field filter
        if (filters.name) {
          whereOptions.name = getStringFieldFilterOperator(
            filters.name,
            'name'
          );
        }

        if (filters.age) {
          whereOptions.age = getStringFieldFilterOperator(filters.age, 'age');
        }

        if (filters.breed) {
          whereOptions.breed = getStringFieldFilterOperator(
            filters.breed,
            'age'
          );
        }
      } catch (error) {
        throw new Error(
          oneLine`
              [EntPetService] -> [getPets] => ${(error as Error).message}
            `
        );
      }
    }

    const findArgs = {
      relations: [],
      take: pagination?.first || 50,
      skip: pagination?.after || 0,
      where: Object.keys(whereOptions).length ? whereOptions : undefined,
    };

    const pets = await EntPet.find(findArgs);

    if (pets.length === 0) {
      // Return no results
      return {
        pageInfo: {
          hasNextPage: false,
        },
        nodes: [],
        statistics: {
          count: 0,
        },
      };
    }

    // Check if there's a next page
    const nextRecord = await EntPet.find({
      take: 1,
      skip: findArgs.take + findArgs.skip,
      where: findArgs.where,
    });

    const hasNextPage = nextRecord.length === 1;

    // Check the total count of the records based on filters
    const count = await EntPet.count({
      where: findArgs.where,
    });

    return {
      pageInfo: {
        hasNextPage,
      },
      nodes: pets,
      statistics: {
        count,
      },
    };
  }

  public async createPet(data: CreateEntPetData): Promise<EntPet> {
    // Build a new entity instance
    const pet = new EntPet();

    // Set scalar values
    pet.name = data.name;
    pet.age = data.age;
    pet.breed = data.breed;

    // Save the entity
    await pet.save();

    return pet;
  }

  public async updatePet(data: UpdateEntPetData): Promise<EntPet> {
    const pet = await EntPet.findOne({
      relations: ['brand', 'images', 'industry', 'processingCurrencies'],
      where: { id: data.id },
    });

    if (!pet) {
      throw new Error(
        oneLine`
          [EntPetService] [updatePet] 
          Could not update EntPet with id='${data.id}' because it could
          NOT be found in the database.
        `
      );
    }

    if (data.name) {
      pet.name = data.name.value;
    }

    if (data.age) {
      pet.age = data.age.value;
    }

    if (data.breed) {
      if (data.breed.operation === UpdateOperation.UPDATE) {
        pet.breed = data.breed.value;
      }

      if (data.breed.operation === UpdateOperation.DELETE) {
        pet.breed = undefined;
      }
    }

    await pet.save();

    // Return the updated entity
    return pet;
  }

  public async deletePet(id: string): Promise<boolean> {
    const deletionResult = await EntPet.delete(id);

    return deletionResult.affected === 1;
  }
}

export default EntPetService;
