const { pool } = require('../../../config');
const { removeSpecialCharacters } = require('../../helpers/db_helper');

const insertDocuments = async (documents = []) => {
  let insertStatement = prepareInsertStatement(documents);
  await pool.query(insertStatement);
};

const prepareInsertStatement = (documents = []) => {
  let insertStatement = `INSERT INTO
                          document (title, image, description, date_last_edited, search_tokens)
                        VALUES `;

  const values = prepareValues(documents);

  return insertStatement + values.join(', ');
};

const prepareValues = (documents) => {
  const values = [];
  for (let doc of documents) {
    const nameAndDescription = removeSpecialCharacters(`${doc.name.toLowerCase()} ${doc.description.toLowerCase()}`);
    values.push(
      `('${doc.name}', '${doc.image}', '${doc.description}', '${doc.dateLastEdited}', '${nameAndDescription}')`
    );
  }
  return values;
};

module.exports = {
  insertDocuments,
};
