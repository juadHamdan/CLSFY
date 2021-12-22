# Array to Dictionary

## Why?

Working with lists of data can add unnecessary complexity to operations, both in the code the developer has to write, and in the operations the computer has to perform.

Dictionaries provide a simpler interface to access and modify data.

## For example:

### Using arrays:

We have an array containing user objects, each with an `id` and a `name`. Finding a single user looks something like this:

```javascript
const theIdToFind = 123;
const found = list.find(user => user.id === theIdToFind);
```

If user `123` were the last member of the list, we'd iterate the whole list to find this user.

Changing a user's name looks something like this:

```javascript
const theIdToChange = 123;
const newName = 'Jonathan Smith';
const listWithChangedName = list.map(user => {
  if (user.id !== theIdToChange) {
    return user;
  }
  return Object.assign(
    {},
    user,
    { name: newName }
  );
});
```

There are various ways to do this, many even more cumbersome than the above to _write_ for the developer. With this method, we have to iterate the entire list to change one value.

### Using dictionaries:

We iterate the array once to create a dictionary, then we can use the dictionary for operations on single members of the list without any further iteration. This makes the code
easier to write and operations easier on the processor.

```javascript
const theIdToFind = 123;
const found = dictionary[theIdToFind];
```

```javascript
const theIdToChange = 123;
const newName = 'Jonathan Smith';
dictionary[theIdToChange] = Object.assign(
  {},
  dictionary[theIdToChange],
  { name: newName }
);
```

## Installation

```bash
npm install --save array-to-dictionary
```

or

```bash
yarn add array-to-dictionary
```

## Usage

```javascript
import arrayToDictionary from 'array-to-dictionary';

const myList =  [
  {
    id: 'abc',
    flavor: 'vanilla',
  },
  {
    id: 'def',
    flavor: 'chocolate',
  },
  {
    id: 'ghi',
    flavor: 'strawberry',
  },
  {
    id: 'jkl',
    flavor: 'astronaut',
  },
];

const myDictionary = arrayToDictionary(myList);

// myDictionary:
{
  abc: {
    flavor: "vanilla",
    id: 'abc',
  },
  def: {
    flavor: "chocolate",
    id: 'def',
  },
  ghi: {
    flavor: "strawberry",
    id: 'ghi',
  },
  jkl: {
    flavor: "astronaut",
    id: 'jkl',
  },
}
```

## `arrayToDictionary(array, [options])`

### parameter `array` (required)

Array to be converted to a dictionary. Must be an array whose members are objects with unique values at key `id` or other user-defined key (see options).

### parameter `options` (optional) `{ indexKey, transformValues }`

Object containing either or both of these keys:

#### `indexKey` (string)

Default: `"id"`

key to use as index for the created dictionary. Must be unique for each member of the array.

```javascript
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
arrayToDictionary(businessList, { indexKey: 'businessId' });
```

#### `transformValues` (function)

Default: none

Executed on each member of the list before it's set in the dictionary

```javascript
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
const enhancedThings = arrayToDictionary(thingsToEnhance, {
  transformValues: enhance,
});

//enhancedThings
{
  a: {
    id: 'a',
    name: 'bike',
    description: 'An amazing bike',
  },
  b: {
    id: 'b',
    name: 'wagon',
    description: 'An amazing wagon',
  },
  c: {
    id: 'c',
    name: 'skateboard',
    description: 'An amazing skateboard',
  },
}
```

## A more robust alternative:

[normalizr](https://github.com/paularmstrong/normalizr):

Normalizr is a more feature-rich way to create dictionaries from arrays. Nested objects are broken out into dictionaries according to a user-defined schema. A great alternative that requires a bit more buy-in.
