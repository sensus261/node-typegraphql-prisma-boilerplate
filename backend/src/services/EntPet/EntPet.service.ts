import { Prisma, EntPet } from '@prisma/client';
import { Service } from 'typedi';

import { getStringFieldFilterOperator } from '@src/graphql/inputs/FilterEntity/utils/FieldFilterOperators';
import { PaginationInput } from '@src/graphql/inputs/PaginateEntity/PaginationInput';
import { UpdateOperation } from '@src/graphql/inputs/UpdateEntity/UpdateOperation.enum';
import CreateEntPetData from '@src/graphql/resolvers/EntPet/inputs/CreateEntPetData';
import EntPetFilters from '@src/graphql/resolvers/EntPet/inputs/EntPetFiltersData';
import UpdateEntPetData from '@src/graphql/resolvers/EntPet/inputs/UpdateEntPetData';
import { PaginatedPetsResponse } from '@src/graphql/resolvers/EntPet/outputs/EntPetPagination';
import prisma from '@src/utils/prisma';

@Service()
class EntPetService {
  public async getPetByID(id: string): Promise<EntPet> {
    const pet = await prisma.entPet.findFirstOrThrow({
      where: { id },
    });

    return pet;
  }

  public async getPets(
    pagination?: PaginationInput,
    filters?: EntPetFilters
  ): Promise<PaginatedPetsResponse> {
    const whereOptions: Prisma.EntPetWhereInput = {};

    if (filters) {
      if (filters.name) {
        whereOptions.name = getStringFieldFilterOperator(filters.name, 'name');
      }

      if (filters.age) {
        whereOptions.age = getStringFieldFilterOperator(filters.age, 'age');
      }

      if (filters.breed) {
        whereOptions.breed = getStringFieldFilterOperator(filters.breed, 'age');
      }
    }

    const findArgs = {
      take: pagination?.first || 50,
      skip: pagination?.after || 0,
      where: Object.keys(whereOptions).length ? whereOptions : undefined,
    };

    const pets = await prisma.entPet.findMany(findArgs);

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
    const nextRecord = await prisma.entPet.findMany({
      take: 1,
      skip: findArgs.take + findArgs.skip,
      where: findArgs.where,
    });

    const hasNextPage = nextRecord.length === 1;

    // Check the total count of the records based on filters
    const count = await prisma.entPet.count({
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
    const pet = prisma.entPet.create({
      data: {
        name: data.name,
        age: data.age,
        breed: data.breed,
      },
    });

    return pet;
  }

  public async updatePet(data: UpdateEntPetData): Promise<EntPet> {
    await prisma.entPet.findFirstOrThrow({
      where: { id: data.id },
    });

    const newPetData: Prisma.EntPetUpdateArgs['data'] = {};

    if (data.name) {
      newPetData.name = data.name.value;
    }

    if (data.age) {
      newPetData.age = data.age.value;
    }

    if (data.breed) {
      if (data.breed.operation === UpdateOperation.UPDATE) {
        newPetData.breed = data.breed.value;
      }

      if (data.breed.operation === UpdateOperation.DELETE) {
        newPetData.breed = null;
      }
    }

    const pet = await prisma.entPet.update({
      where: { id: data.id },
      data: newPetData,
    });

    return pet;
  }

  public async deletePet(id: string): Promise<boolean> {
    await prisma.entPet.delete({
      where: { id },
    });

    return true;
  }
}

export default EntPetService;
