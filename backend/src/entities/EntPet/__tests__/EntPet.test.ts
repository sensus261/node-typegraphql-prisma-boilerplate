import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

import { EntPet } from '@src/entities';

describe('EntPet queries test', () => {
  test('it creates a pet', async () => {
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

  //   test('it doesnt have access to last pet', async () => {
  //     const pet = await EntPet.findOneOrFail({
  //       where: { name: 'Milo' },
  //     });

  //     expect(pet.id).toBeDefined();
  //   });
});
