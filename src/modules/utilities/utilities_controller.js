const utilitiesService = require('./utilities_service');

const seedData = async (request, response) => {
  try {
    await utilitiesService.seedData();
    response.status(200).json('Data seeding complete.');
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

module.exports = {
  seedData,
};
