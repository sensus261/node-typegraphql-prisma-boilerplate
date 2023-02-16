import 'reflect-metadata';
import { EntPet } from '@prisma/client';

import { EntPetService } from '@src/services';
import { gql, graphQLCall } from '@src/tests/graphql';
import prisma from '@src/utils/prisma';

let pet: EntPet;

describe('EntPet mutations tests', () => {
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

  test('should be able to create a new pet', async () => {
    const result = await graphQLCall({
      source: gql`
        mutation createPet($data: CreateEntPetData!) {
          createPet(data: $data) {
            id
            name
            age
            breed
          }
        }
      `,
      variableValues: {
        data: {
          name: 'Max',
          age: '2 years',
          breed: 'Labrador',
        },
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result).toBeTruthy();
    expect(result.data?.createPet.id).toBeDefined();
    expect(result.data?.createPet.name).toEqual('Max');
    expect(result.data?.createPet.age).toEqual('2 years');
    expect(result.data?.createPet.breed).toEqual('Labrador');
  });

  test('should be able to update a pet', async () => {
    const result = await graphQLCall({
      source: gql`
        mutation updatePet($data: UpdateEntPetData!) {
          updatePet(data: $data) {
            id
            name
            age
            breed
          }
        }
      `,
      variableValues: {
        data: {
          id: pet.id,
          name: {
            value: 'Max',
          },
          age: {
            value: '2 years',
          },
          breed: {
            value: 'Labrador',
            operation: 'UPDATE',
          },
        },
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result).toBeTruthy();
    expect(result.data?.updatePet.id).toBeDefined();
    expect(result.data?.updatePet.name).toEqual('Max');
    expect(result.data?.updatePet.age).toEqual('2 years');
    expect(result.data?.updatePet.breed).toEqual('Labrador');
  });

  test('should be able to delete a pet', async () => {
    const result = await graphQLCall({
      source: gql`
        mutation deletePet($id: String!) {
          deletePet(id: $id)
        }
      `,
      variableValues: {
        id: pet.id,
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result).toBeTruthy();
    expect(result.data?.deletePet).toBeTruthy();
    await expect(
      prisma.entPet.findFirst({ where: { id: pet.id } })
    ).resolves.toBe(null);
  });
});
