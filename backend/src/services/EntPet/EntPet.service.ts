import { PrismaClient, Prisma, EntPet } from '@prisma/client';
import { oneLine } from 'common-tags';

import { getStringFieldFilterOperator } from '@src/graphql/inputs/FilterEntity/utils/FieldFilterOperators';
import { PaginationInput } from '@src/graphql/inputs/PaginateEntity/PaginationInput';
import { UpdateOperation } from '@src/graphql/inputs/UpdateEntity/UpdateOperation.enum';
import CreateEntPetData from '@src/graphql/resolvers/EntPet/inputs/CreateEntPetData';
import EntPetFilters from '@src/graphql/resolvers/EntPet/inputs/EntPetFiltersData';
import UpdateEntPetData from '@src/graphql/resolvers/EntPet/inputs/UpdateEntPetData';
import { PaginatedPetsResponse } from '@src/graphql/resolvers/EntPet/outputs/EntPetPagination';

class EntPetService {
  public async getPetByID(id: string): Promise<EntPet> {
    const prisma = new PrismaClient();

    const pet = await prisma.entPet.findFirstOrThrow({
      where: { id },
    });

    return pet;
  }

  public async getPets(
    pagination?: PaginationInput,
    filters?: EntPetFilters
  ): Promise<PaginatedPetsResponse> {
    const prisma = new PrismaClient();

    const whereOptions: Prisma.EntPetWhereInput = {};

    if (filters) {
      try {
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
    const prisma = new PrismaClient();

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
    const prisma = new PrismaClient();

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
        newPetData.breed = undefined;
      }
    }

    const pet = await prisma.entPet.update({
      where: { id: data.id },
      data: newPetData,
    });

    return pet;
  }

  public async deletePet(id: string): Promise<boolean> {
    const prisma = new PrismaClient();

    await prisma.entPet.delete({
      where: { id },
    });

    return true;
  }
}

export default EntPetService;
