import arrayToDictionary from '../src';

describe('Array to Dictionary', () => {
  test('converts objects with IDs to a dictionary', () => {
    const list = [
      {
        id: 1,
        flavor: 'vanilla',
      },
      {
        id: 2,
        flavor: 'chocolate',
      },
      {
        id: 3,
        flavor: 'strawberry',
      },
      {
        id: 4,
        flavor: 'astronaut',
      },
    ];
    const converted = arrayToDictionary(list);
    expect(converted).toMatchSnapshot();
  });
  test('throws if a non-array is passed', () => {
    const notList = 5;
    const badCall = () => {
      arrayToDictionary(notList);
    };
    expect(badCall).toThrowErrorMatchingSnapshot();
  });
  test('uses user-defined index-key', () => {
    const businessList = [
      {
        businessId: 'abc123',
        name: 'making money',
      },
      {
        businessId: 'def456',
        name: 'making more money',
      },
      {
        businessId: 'ghi789',
        name: 'making the most money',
      },
    ];
    const converted = arrayToDictionary(businessList, {
      indexKey: 'businessId',
    });
    expect(converted).toMatchSnapshot();
  });
  test('transforms values correctly if option exists', () => {
    const thingsToEnhance = [
      {
        id: 'a',
        name: 'bike',
      },
      {
        id: 'b',
        name: 'wagon',
      },
      {
        id: 'c',
        name: 'skateboard',
      },
    ];
    const enhance = thing => ({
      ...thing,
      description: `An amazing ${thing.name}`,
    });
    const converted = arrayToDictionary(thingsToEnhance, {
      transformValues: enhance,
    });
    expect(converted).toMatchSnapshot();
  });
  test('skips null and non-POJO values', () => {
    const inconsistentList = [
      {
        id: 1,
        flavor: 'vanilla',
      },
      null,
      {
        id: 2,
        flavor: 'chocolate',
      },
      null,
      5,
      {
        id: 3,
        flavor: 'strawberry',
      },
      'undictionary-able',
      {
        id: 4,
        flavor: 'astronaut',
      },
    ];
    const converted = arrayToDictionary(inconsistentList);
    expect(converted).toMatchSnapshot();
  });
  test('retains value with id of `0`', () => {
    const listWithZero = [
      {
        id: 0,
        flavor: 'hazelnut',
      },
      {
        id: 1,
        flavor: 'vanilla',
      },
      {
        id: 2,
        flavor: 'chocolate',
      },
      {
        id: 3,
        flavor: 'strawberry',
      },
      {
        id: 4,
        flavor: 'astronaut',
      },
    ];
    const converted = arrayToDictionary(listWithZero);
    expect(converted).toMatchSnapshot();
  });
});
