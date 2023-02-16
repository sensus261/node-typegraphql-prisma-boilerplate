import 'reflect-metadata';
import { EntPet } from '@prisma/client';

import { EntPetService } from '@src/services';
import { gql, graphQLCall } from '@src/tests/graphql';
import prisma from '@src/utils/prisma';

let pet: EntPet;

describe('EntPet queries tests', () => {
  beforeEach(async () => {
    const deleteEntPet = prisma.entPet.deleteMany();

    await prisma.$transaction([deleteEntPet]);
  });

  beforeEach(async () => {
    const petService = new EntPetService();
    pet = await petService.createPet({
      name: 'Milo',
      age: '1 year',
      breed: 'Bichon',
    });
  });

  test('should be able to query pets', async () => {
    const result = await graphQLCall({
      source: gql`
        query pets {
          pets {
            nodes {
              id
              name
              age
              breed
            }
            pageInfo {
              hasNextPage
            }
            statistics {
              count
            }
          }
        }
      `,
    });

    expect(result.errors).toBeUndefined();
    expect(result).toBeTruthy();
    expect(result.data?.pets.nodes).toHaveLength(1);
    expect(result.data?.pets.nodes[0].id).toEqual(pet.id);
    expect(result.data?.pets.nodes[0].name).toEqual(pet.name);
    expect(result.data?.pets.nodes[0].age).toEqual(pet.age);
    expect(result.data?.pets.nodes[0].breed).toEqual(pet.breed);
  });

  test('should be able to query a pet by id', async () => {
    const result = await graphQLCall({
      source: gql`
        query pet($id: String!) {
          pet(id: $id) {
            id
            name
            age
            breed
          }
        }
      `,
      variableValues: {
        id: pet.id,
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result).toBeTruthy();
    expect(result.data?.pet.id).toEqual(pet.id);
    expect(result.data?.pet.name).toEqual(pet.name);
    expect(result.data?.pet.age).toEqual(pet.age);
    expect(result.data?.pet.breed).toEqual(pet.breed);
  });
});
