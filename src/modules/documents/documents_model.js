const { pool } = require('../../../config');
const { getPhraseBasedFtsFunction } = require('../../helpers/db_helper');

const searchDocuments = async (queryParams) => {
  const client = await pool.connect();
  try {
    const { searchText, sortBy, limit, offset } = queryParams;

    let searchSql = `SELECT
                      title,
                      description,
                      image
                    FROM
                      document`;

    const whereCondition = searchText
      ? ` WHERE to_tsvector(title || description) @@ ${getPhraseBasedFtsFunction(searchText)}`
      : '';

    searchSql += whereCondition;

    searchSql += ` ORDER BY ${sortBy} LIMIT ${limit} OFFSET ${offset}`;

    const result = await client.query(searchSql);

    const totalCount = await fetchTotalCount(client, `SELECT COUNT(*) as total_count FROM document ${whereCondition}`);

    return { totalCount: totalCount[0].total_count, result: result.rows };
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

const fetchTotalCount = async (client, sql) => {
  const count = await client.query(sql);
  return count.rows;
};

module.exports = {
  searchDocuments,
};
