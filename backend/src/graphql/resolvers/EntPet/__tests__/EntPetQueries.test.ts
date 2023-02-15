import { EntPet } from '@prisma/client';

import { EntPetService } from '@src/services';
import { beforeAllTests } from '@src/tests/beforeAllTests';
import { gql, graphQLCall } from '@src/tests/graphql';

let pet: EntPet;

describe('EntPet queries tests', () => {
  beforeAllTests();

  beforeEach(async () => {
    const petService = new EntPetService();
    pet = await petService.createPet({
      name: 'Milo',
      age: '1 year',
      breed: 'Bichon',
    });
  });

  test('should be able to query pets', async () => {
    const pets = await graphQLCall({
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

    expect(pets.errors).toBeUndefined();
    expect(pets).toBeTruthy();
    expect(pets.data?.pets.nodes).toHaveLength(1);
    expect(pets.data?.pets.nodes[0].id).toEqual(pet.id);
    expect(pets.data?.pets.nodes[0].name).toEqual(pet.name);
    expect(pets.data?.pets.nodes[0].age).toEqual(pet.age);
    expect(pets.data?.pets.nodes[0].breed).toEqual(pet.breed);
  });
});
