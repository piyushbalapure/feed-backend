const removeSpecialCharacters = (str) => {
  return str.replace(/[^a-zA-Z ]/g, '');
};

const getPhraseBasedFtsFunction = (phrase) => {
  if (phrase.indexOf('"') === -1) {
    return `to_tsquery('${phrase.split(' ').join(' | ')}')`;
  }
  const quotedPhrase = getQuotedPhrase(phrase);
  return `plainto_tsquery('${removeSpecialCharacters(quotedPhrase)}')`;
};

const getQuotedPhrase = (phrase) => {
  matches = phrase.match(/"([^"]+)"/);

  return matches && matches.length > 1 ? matches[1] : phrase;
};

module.exports = {
  getPhraseBasedFtsFunction,
  removeSpecialCharacters,
};
