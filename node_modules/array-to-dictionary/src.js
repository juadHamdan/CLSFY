const defaultOptions = {
  indexKey: 'id',
};

const arrayToDictionary = (list = [], userDefinedOptions = {}) => {
  if (!Array.isArray(list)) {
    throw new Error('Cannot convert a non-array value to dictionary.');
  }
  const { indexKey, transformValues } = {
    ...defaultOptions,
    ...userDefinedOptions,
  };
  return list.reduce((dictionary, item) => {
    // skip falsy members or members with no `indexKey`
    if (!item || !(item[indexKey] || item[indexKey] === 0)) {
      return dictionary;
    }
    return {
      ...dictionary,
      [item[indexKey]]: transformValues ? transformValues(item) : item,
    };
  }, {});
};

export default arrayToDictionary;
