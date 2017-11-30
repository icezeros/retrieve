const Retrieve = require('../index');
// const Retrieve = require('js-retrieve');

const retrieve = new Retrieve({
  fields: {
    id: 'token',
    name: 'userName',
  },
});
const test2 = [
  {
    userName: '水电费',
    token: 1,
  },
  {
    userName: '发过火',
    token: 2,
  },
  {
    userName: '体温表',
    token: 3,
  },
  {
    userName: '大洪水',
    token: 4,
  },
];

const result = retrieve.searchSource(test2, 'shui');
console.log(result);
