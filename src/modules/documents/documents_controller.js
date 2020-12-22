const documentsService = require('./documents_service');

const searchDocuments = async (request, response) => {
  try {
    const query = request.query;
    const result = await documentsService.searchDocuments(query);
    response.status(200).json(result);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

module.exports = {
  searchDocuments,
};
