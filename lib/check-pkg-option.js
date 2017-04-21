'use strict';

const path = require('path');
const pkg = require(path.join(process.env.PWD, 'package.json'));

/**
 * 获取对象类型
 *
 * @param {*} obj
 * @returns {string}
 */
function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

/**
 * 获取package.json指定项内容
 * @param name
 * @param storeKeyName
 * @returns {*}
 */
function getter(name, storeKeyName) {
  let store = pkg['hexoExtendFeature'];
  if (storeKeyName && pkg.hasOwnProperty(storeKeyName)) {
    store = pkg[storeKeyName];
  }

  if (!store || !store.hasOwnProperty(name)) {
    return {
      value: null,
      desc: null
    };
  }

  let item = store[name];
  switch (getType(item)) {
    case 'array':
      // ["on", "desc"]
      if (typeof item[0] === 'string' && ['on', 'off'].indexOf(item[0]) > -1) {
        return {value: item[0] === 'on', desc: item[1]};
      } else {
        return {value: item[0], desc: item[1]};
      }
    default:
      return {value: item, desc: null};
  }
}

module.exports = getter;
