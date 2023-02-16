import 'reflect-metadata';

import { FilterOperation } from '@src/graphql/inputs/FilterEntity/FilterOperation.enum';
import { UpdateOperation } from '@src/graphql/inputs/UpdateEntity/UpdateOperation.enum';
import { EntPetService } from '@src/services';
import prisma from '@src/utils/prisma';

const petService = new EntPetService();

describe('EntPet entity service tests', () => {
  beforeEach(async () => {
    const deleteEntPet = prisma.entPet.deleteMany();

    await prisma.$transaction([deleteEntPet]);
  });

  test('should be able to create a new pet', async () => {
    const pet = await petService.createPet({
      name: 'Milo',
      age: '1 year',
      breed: 'Bichon',
    });

    expect(pet.id).toBeDefined();
  });

  test('should be able to update a pet with an update operation on breed', async () => {
    const pet = await prisma.entPet.create({
      data: {
        name: 'Milo',
        age: '1 year',
        breed: 'Bichon',
      },
    });

    await petService.updatePet({
      id: pet.id,
      name: {
        value: 'Max',
      },
      age: {
        value: '2 years',
      },
      breed: {
        value: 'Labrador',
        operation: UpdateOperation.UPDATE,
      },
    });

    const updatedPet = await prisma.entPet.findFirstOrThrow({
      where: {
        id: pet.id,
      },
    });

    expect(updatedPet.name).toEqual('Max');
    expect(updatedPet.age).toEqual('2 years');
    expect(updatedPet.breed).toEqual('Labrador');
  });

  test('should be able to update a pet with a delete operation on breed', async () => {
    const pet = await prisma.entPet.create({
      data: {
        name: 'Milo',
        age: '1 year',
        breed: 'Bichon',
      },
    });

    await petService.updatePet({
      id: pet.id,
      name: {
        value: 'Max',
      },
      age: {
        value: '2 years',
      },
      breed: {
        value: 'Labrador',
        operation: UpdateOperation.DELETE,
      },
    });

    const updatedPet = await prisma.entPet.findFirstOrThrow({
      where: {
        id: pet.id,
      },
    });

    expect(updatedPet.name).toEqual('Max');
    expect(updatedPet.age).toEqual('2 years');
    expect(updatedPet.breed).toEqual(null);
  });

  test('should be able to delete a pet', async () => {
    const pet = await prisma.entPet.create({
      data: {
        name: 'Milo',
        age: '1 year',
        breed: 'Bichon',
      },
    });

    const deletionResult = await petService.deletePet(pet.id);
    expect(deletionResult).toBe(true);

    expect(
      await prisma.entPet.findFirst({
        where: {
          id: pet.id,
        },
      })
    ).toEqual(null);
  });

  test('should be able to retrieve a pet by id', async () => {
    const pet = await prisma.entPet.create({
      data: {
        name: 'Milo',
        age: '1 year',
        breed: 'Bichon',
      },
    });

    const retrievedPet = await petService.getPetByID(pet.id);

    expect(retrievedPet).toBeDefined();
    expect(retrievedPet?.name).toEqual(pet.name);
    expect(retrievedPet?.age).toEqual(pet.age);
  });

  test('should be able to retrieve a list of pets', async () => {
    const pets = await Promise.all([
      prisma.entPet.create({
        data: {
          name: 'Milo',
          age: '1 year',
          breed: 'Bichon',
        },
      }),
      prisma.entPet.create({
        data: {
          name: 'Max',
          age: '2 years',
          breed: 'Labrador',
        },
      }),
    ]);

    const retrievedPets = await petService.getPets();
    expect(retrievedPets.nodes).toHaveLength(2);
    expect(retrievedPets.nodes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: pets[0].name,
          age: pets[0].age,
        }),
        expect.objectContaining({
          name: pets[1].name,
          age: pets[1].age,
        }),
      ])
    );
  });

  test('should be able to retrieve a list of pets with pagination', async () => {
    await Promise.all([
      prisma.entPet.create({
        data: {
          name: 'Milo',
          age: '1 year',
          breed: 'Bichon',
        },
      }),
      prisma.entPet.create({
        data: {
          name: 'Max',
          age: '2 years',
          breed: 'Labrador',
        },
      }),
      prisma.entPet.create({
        data: {
          name: 'Luna',
          age: '3 years',
          breed: 'Poodle',
        },
      }),
    ]);

    const retrievedPets = await petService.getPets({ first: 2 });

    expect(retrievedPets.nodes).toHaveLength(2);
    expect(retrievedPets.pageInfo.hasNextPage).toEqual(true);
    expect(retrievedPets.pageInfo).toBeDefined();

    const retrievedPetsNextPage = await petService.getPets({
      first: 1,
      after: 2,
    });

    expect(retrievedPetsNextPage.nodes).toHaveLength(1);
    expect(retrievedPetsNextPage.pageInfo.hasNextPage).toEqual(false);
  });

  test('should be able to retrieve a list of pets with filters', async () => {
    const pets = await Promise.all([
      prisma.entPet.create({
        data: {
          name: 'Milo',
          age: '1 year',
          breed: 'Bichon',
        },
      }),
      prisma.entPet.create({
        data: {
          name: 'Max',
          age: '2 years',
          breed: 'Labrador',
        },
      }),
      prisma.entPet.create({
        data: {
          name: 'Luna',
          age: '3 years',
          breed: 'Poodle',
        },
      }),
    ]);

    const retrievedPets = await petService.getPets(undefined, {
      name: {
        value: pets[0].name,
        operation: FilterOperation.EQUALS,
      },
    });
    expect(retrievedPets.nodes).toHaveLength(1);
    expect(retrievedPets.nodes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: pets[0].name,
          age: pets[0].age,
        }),
      ])
    );
    expect(retrievedPets.pageInfo.hasNextPage).toEqual(false);
    expect(retrievedPets.pageInfo).toBeDefined();
  });

  test('should be able to retrieve a list of pets with correct statistics', async () => {
    const pets = await Promise.all([
      prisma.entPet.create({
        data: {
          name: 'Milo',
          age: '1 year',
          breed: 'Bichon',
        },
      }),
      prisma.entPet.create({
        data: {
          name: 'Max',
          age: '2 years',
          breed: 'Labrador',
        },
      }),
      prisma.entPet.create({
        data: {
          name: 'Luna',
          age: '3 years',
          breed: 'Poodle',
        },
      }),
    ]);

    const retrievedPets = await petService.getPets({ first: 1 });
    expect(retrievedPets.statistics.count).toEqual(pets.length);
  });
});
