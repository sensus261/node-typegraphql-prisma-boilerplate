import { EntPet } from '@src/entities';
import { gql, graphQLCall } from '@src/tests/graphql';
import {
  clearAndDestroyDatabase,
  clearDatabase,
  initializeDatabase,
  synchronizeDatabase,
} from '@src/tests/helper';

let pet: EntPet;

describe('EntPet queries tests', () => {
  beforeAll(async () => {
    await initializeDatabase();
  });

  beforeEach(async () => {
    await synchronizeDatabase();

    pet = new EntPet();
    pet.name = 'Milo';
    pet.age = '1 year';
    pet.breed = 'Bichon';

    await pet.save();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await clearAndDestroyDatabase();
  });

  it('should be able to query pets', async () => {
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
