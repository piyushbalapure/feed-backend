const express = require('express');
const utilitiesRoutes = require('./src/modules/utilities/utilities.routes');
const documentsRoutes = require('./src/modules/documents/documents.routes');

const router = express.Router();

router.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

router.use('/utilities', utilitiesRoutes);
router.use('/documents', documentsRoutes);

module.exports = router;
