const Retrieve = require('../index');

const retrieve = new Retrieve({
  fields: {
    id: 'token',
    name: 'userName',
  },
  all: false, //true 排序后返回所有数据； false  排序后返回匹配到的数据
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
    userName: 'abc def',
    token: 4,
  },
  {
    userName: 'def adg',
    token: 5,
  },
];

const result = retrieve.searchSource(test2, 'shui');
console.log(result);

// const dictionary = retrieve.convertDictionary(test2);
// console.log(dictionary);
