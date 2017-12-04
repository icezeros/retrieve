'use strict';
const pinyin = require('pinyin');
const _ = require('lodash');

class Retrieve {
  constructor(option) {
    const tmpOption = {
      fields: {},
      all: false,
    };
    option = _.merge({}, tmpOption, option);
    this.fields = {
      id: option.fields.id || 'id',
      name: option.fields.name || 'name',
    };
  }

  convertArray(data, result = []) {
    const that = this;
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
        tmpArr = that.convertArray(v1, tmpArr);
      }
    });
    return tmpArr;
  }
  convertPinyin(data) {
    const cns = data.split('');
    const out = pinyin(data, {
      heteronym: true, // 启用多音字模式
      // segment: true, // 启用分词，以解决多音字问题。
      style: pinyin.STYLE_NORMAL, // 设置拼音风格
    });

    out.forEach((value, key) => {
      out[key].unshift(cns[key]);
    });
    return out;
  }
  convertDictionary(array) {
    const that = this;
    const data = array.map(tmpObj =>
      _.mapKeys(tmpObj, (item, key) => {
        const fields = that.fields;

        if (key === fields.id) {
          return 'id';
        }

        if (key === fields.name) {
          return 'name';
        }
      })
    );

    const result = [];
    data.forEach(item => {
      const pys = that.convertPinyin(item.name);

      const tmpArr = that.convertArray(pys);

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

  getResult(source, str) {
    str = this.convertStr(str);
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
    const filter = _.filter(result, item => item.index > 0);
    return _.sortBy(filter, v => -v.index);
  }
  convertStr(str) {
    return str.toLowerCase();
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
  searchSource(source, str) {
    return this.getResult(this.convertDictionary(source), str);
  }

  search(source, str) {
    const that = this;
    const array = that.getResult(source, str);

    return array.map(tmpObj =>
      _.mapKeys(tmpObj, (item, key) => {
        const fields = that.fields;

        if (key === 'id') {
          return that.fields.id;
        }

        if (key === 'name') {
          return that.fields.name;
        }
        return key;
      })
    );
  }
}
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

module.exports = Retrieve;
