# js retrieve

## 快速开始

### 安装

```bash
npm install js-retrieve
```

### 示例一：

```node
const Retrieve = require('js-retrieve');

const retrieve = new Retrieve({
  fields: {
    id: 'token',
    name: 'userName',
  },
  all: false,     //true 排序后返回所有数据； false  排序后返回匹配到的数据
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
```

```
[ { id: 1, name: '水电费', index: 4000 },
  { id: 4, name: '大洪水', index: 80 },
  { id: 2, name: '发过火', index: 0 },
  { id: 3, name: '体温表', index: 0 } ]
```

### 示例二：

```node
const Retrieve = require('js-retrieve');

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

const dictionary = retrieve.convertDictionary(test2);
const result = retrieve.search(dictionary, 'shui');
console.log(result);
```

```
[ { id: 1, name: '水电费', index: 4000 },
  { id: 4, name: '大洪水', index: 80 },
  { id: 2, name: '发过火', index: 0 },
  { id: 3, name: '体温表', index: 0 } ]
```

### 建议

使用第二种方法，然后将要检索的数据提前处理数据，并将数据持久化存储体提高性能。
