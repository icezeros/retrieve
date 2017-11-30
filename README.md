# js retrieve

## 快速开始

### 安装

```bash
npm install js-retrieve
```

### 示例一：

```node
const retrieve = require('js-retrieve');

const test2 = [
  {
    name: '水电费',
    id: 1,
  },
  {
    name: '发过火',
    id: 2,
  },
  {
    name: '体温表',
    id: 3,
  },
  {
    name: '大洪水',
    id: 4,
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
const retrieve = require('js-retrieve');

const test2 = [
  {
    name: '水电费',
    id: 1,
  },
  {
    name: '发过火',
    id: 2,
  },
  {
    name: '体温表',
    id: 3,
  },
  {
    name: '大洪水',
    id: 4,
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
