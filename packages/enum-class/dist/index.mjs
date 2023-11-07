var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class EnumerationPlugin {
  constructor(param, enums) {
    __publicField(this, "_name");
    __publicField(this, "_enums");
    if (typeof param === "string") {
      this._name = param;
      this._enums = enums || [];
    } else {
      this._name = param.name;
      this._enums = param.enums;
      if (param.extendFunc) {
        Object.keys(param.extendFunc).forEach((key) => {
          this[key] = () => {
            if (param.extendFunc && param.extendFunc[key]) {
              param.extendFunc[key](this);
            }
          };
        });
      }
    }
  }
  get name() {
    return this._name;
  }
  get enums() {
    return this._enums;
  }
  /**
   * 根据Value获取label描述
   * @param {string | number | boolean} value 枚举值
   * @param {string} [defaultStr="--"] 默认描述
   */
  string(value, defaultStr = "--") {
    if (typeof value === "string" && !value) {
      return defaultStr || "--";
    }
    if (value === null || value === void 0) {
      return defaultStr || "--";
    }
    const activeEnum = this.enums.find((item) => {
      return item.value.toString() === value.toString();
    });
    if (activeEnum) {
      return activeEnum.label;
    }
    return value && value.toString() || defaultStr || "--";
  }
  /**
   * 根据枚举描述获取值Value
   * @param {string} label 枚举描述
   * @returns {string | number | boolean} 枚举值
   */
  value(label) {
    const activeEnum = this.enums.find((item) => {
      return item.label === label;
    });
    if (activeEnum) {
      return activeEnum.value;
    }
    return label;
  }
  /**
   * 枚举数据生成Option选项列表
   * @param [param]
   * @return {Enumerate[]}
   */
  options(param) {
    if (typeof param === "undefined") {
      return this.enums || [];
    }
    if (typeof param === "boolean") {
      if (param) {
        return this.enums.reduce((result, item) => {
          result.push({ ...item, label: this.string(item.value) });
          return result;
        }, []);
      } else {
        return this.enums || [];
      }
    }
    if (typeof param === "function") {
      return this.enums.map(param);
    }
    return this.enums || [];
  }
  others() {
    return this.enums.reduce((result, item) => {
      result.push(item.other || {});
      return result;
    }, []);
  }
}
const defineEnum = (name, enums) => {
  return () => new EnumerationPlugin(name, enums);
};

export { defineEnum };
