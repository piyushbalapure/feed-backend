const fs = require('fs');
const path = require('path');
const utilitiesModel = require('./utilities_model');

const seedData = async () => {
  const mockJson = getMockJson();
  await utilitiesModel.insertDocuments(mockJson);
};

const getMockJson = () => {
  const mockData = fs.readFileSync(path.join(__dirname, '../..') + '/mock_data.json');
  return JSON.parse(mockData);
};

module.exports = {
  seedData,
};
