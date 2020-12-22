const documentsModel = require('./documents_model');
const SEARCH_DEFAULT_PAGE_SIZE = 10;

const searchDocuments = async (query) => {
  queryParams = prepareSearchParams(query);
  return await documentsModel.searchDocuments(queryParams);
};

const prepareSearchParams = (queryParams) => {
  let { pageSize: limit = SEARCH_DEFAULT_PAGE_SIZE, searchText = '', sortBy = '', currentPage } = queryParams;
  searchText = searchText.trim();
  sortBy = sortBy.toLowerCase() === 'datelastedited' ? 'date_last_edited' : 'title';
  currentPage = currentPage >= 0 ? currentPage : 1;
  const offset = (currentPage - 1) * limit;
  return {
    searchText,
    sortBy,
    limit,
    offset,
  };
};

module.exports = {
  searchDocuments,
};
