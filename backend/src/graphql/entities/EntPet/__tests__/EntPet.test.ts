import { EntPetService } from '@src/services';
import { beforeAllTests } from '@src/tests/beforeAllTests';

describe('EntPet entity tests', () => {
  beforeAllTests();

  test('should be able to create a new pet', async () => {
    const petService = new EntPetService();
    const pet = await petService.createPet({
      name: 'Milo',
      age: '1 year',
      breed: 'Bichon',
    });

    expect(pet.id).toBeDefined();
  });

  test('should be able to retrieve a pet by id', async () => {
    const petService = new EntPetService();
    const pet = await petService.createPet({
      name: 'Milo',
      age: '1 year',
      breed: 'Bichon',
    });

    const retrievedPet = await petService.getPetByID(pet.id);

    expect(retrievedPet).toBeDefined();
    expect(retrievedPet?.name).toEqual(pet.name);
    expect(retrievedPet?.age).toEqual(pet.age);
  });
});
