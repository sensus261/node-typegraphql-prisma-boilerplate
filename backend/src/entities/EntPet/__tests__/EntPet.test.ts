import { EntPet } from '@src/entities';
import {
  clearAndDestroyDatabase,
  clearDatabase,
  initializeDatabase,
  synchronizeDatabase,
} from '@src/tests/helper';

describe('EntPet entity tests', () => {
  beforeAll(async () => {
    await initializeDatabase();
  });

  beforeEach(async () => {
    await synchronizeDatabase();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await clearAndDestroyDatabase();
  });

  it('should be able to create a new pet', async () => {
    // Build a new entity instance
    const pet = new EntPet();

    // Set scalar values
    pet.name = 'Milo';
    pet.age = '1 year';
    pet.breed = 'Bichon';

    // Save the entity
    await pet.save();

    expect(pet.id).toBeDefined();
  });

  it('should be able to retrieve a pet by id', async () => {
    // Build a new entity instance
    const pet = new EntPet();

    // Set scalar values
    pet.name = 'Milo';
    pet.age = '1 year';
    pet.breed = 'Bichon';

    // Save the entity
    await pet.save();

    const retrievedPet = await EntPet.findOne({
      where: {
        id: pet.id,
      },
    });

    expect(retrievedPet).toBeDefined();
    expect(retrievedPet?.name).toEqual(pet.name);
    expect(retrievedPet?.age).toEqual(pet.age);
  });

  it('should allow breed to be null', async () => {
    // Build a new entity instance
    const pet = new EntPet();

    // Set scalar values
    pet.name = 'Milo';
    pet.age = '1 year';

    // Save the entity
    await pet.save();

    expect(pet.breed).toBeNull();
  });
});
