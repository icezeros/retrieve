'use strict';
const pinyin = require('pinyin');
const _ = require('lodash');

function convertArray(data, result = []) {
  let tmpArr = [];

  data.forEach(v1 => {
    if (_.isString(v1)) {
      if (result.length === 0) {
        tmpArr.push([v1]);
      } else {
        result.forEach(v2 => {
          tmpArr.push(v2.concat([v1]));
        });
      }
    } else {
      tmpArr = convertArray(v1, tmpArr);
    }
  });
  return tmpArr;
}
function convertPinyin(data) {
  const cns = data.split('');
  const out = pinyin(data, {
    heteronym: true, // 启用多音字模式
    // segment: true, // 启用分词，以解决多音字问题。
    style: pinyin.STYLE_NORMAL, // 设置拼音风格
    heteronym: true,
  });

  out.forEach((value, key) => {
    out[key].unshift(cns[key]);
  });
  return out;
}
function convertDictionary(data) {
  const result = [];
  data.forEach(item => {
    const pys = convertPinyin(item.name);

    const tmpArr = convertArray(pys);

    tmpArr.forEach(v => {
      const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
      // if()
      let v3 = '';
      v.forEach(str => {
        if (reg.test(str)) {
          v3 += str;
        } else {
          v3 += str.slice(0, 1);
        }
      });

      const v2 = v.join('');
      result.push({
        id: item.id,
        name: item.name,
        v1: v,
        v2,
        v3,
        index: 0,
      });
    });
  });
  return result;
}

function search(source, str) {
  const result = [];
  let idFlag;
  let tmp = {};

  source.forEach((item, k) => {
    if (item.id !== idFlag) {
      if (idFlag) {
        result.push(tmp);
      }
      idFlag = item.id;
      tmp = {
        id: item.id,
        name: item.name,
        index: 0,
      };
    }

    const v2Re = item.v2.indexOf(str);

    if (v2Re === 0) {
      tmp.index += 1000;
    }
    if (v2Re > 0) {
      tmp.index += 10;
    }
    const v3Re = item.v3.indexOf(str);

    if (v3Re === 0) {
      tmp.index += 500;
    }
    if (v3Re > 0) {
      tmp.index += 10;
    }

    if (k === source.length - 1) {
      result.push(tmp);
    }
  });
  return _.sortBy(result, v => -v.index);
}

/**
 *
 * @param {*} source
 *[
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
    name: '鲫鱼汤',
    id: 4,
  },
 * @param {*} str
 * shui
 */
function searchSource(source, str) {
  return search(convertDictionary(source), str);
}

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
    name: '鲫鱼汤',
    id: 4,
  },
];

module.exports = {
  convertDictionary,
  search,
  searchSource,
};
