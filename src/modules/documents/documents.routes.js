const express = require('express');
const { validate, Joi } = require('express-validation');
const documentsController = require('./documents_controller');
const router = express.Router();

const searchValidation = {
  query: Joi.object({
    searchText: Joi.string().allow(''),
    sortBy: Joi.string(),
    pageSize: Joi.number(),
    currentPage: Joi.number(),
  }),
};

router.route('/search').get(validate(searchValidation, {}, {}), documentsController.searchDocuments);

module.exports = router;
