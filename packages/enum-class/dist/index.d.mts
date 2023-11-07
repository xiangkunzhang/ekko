declare interface Enumerate<T> {
    value: string | number | boolean;
    label: string;
    other?: T | any;
}
declare interface EnumerateModule<T> {
    name: string;
    enums: Enumerate<T>[];
    extendFunc?: Record<string, (arg0: EnumerateModule<T>) => any>;
}
declare class EnumerationPlugin<T> {
    private readonly _name;
    private readonly _enums;
    [k: string]: any;
    constructor(param: string | EnumerateModule<T>, enums?: Enumerate<T>[]);
    get name(): string;
    get enums(): Enumerate<T>[];
    /**
     * 根据Value获取label描述
     * @param {string | number | boolean} value 枚举值
     * @param {string} [defaultStr="--"] 默认描述
     */
    string(value: string | number | boolean | undefined, defaultStr?: string): string;
    /**
     * 根据枚举描述获取值Value
     * @param {string} label 枚举描述
     * @returns {string | number | boolean} 枚举值
     */
    value(label: string): string | number | boolean;
    /**
     * 枚举数据生成Option选项列表
     * @param {boolean} [labelIsValue] - 使用value作为label
     * @return {Enumerate[]}
     */
    options(labelIsValue?: boolean): Enumerate<T>[];
    /**
     * 枚举数据生成Option选项列表
     * @param {function} [customFunc] - map处理数据方法
     * @return {Enumerate[]}
     */
    options(customFunc?: (value: Enumerate<T>, index: number, array: Enumerate<T>[]) => Enumerate<T>): Enumerate<T>[];
    others(): any[];
}
declare const defineEnum: <T>(name: string | EnumerateModule<T>, enums?: Enumerate<T>[] | undefined) => () => EnumerationPlugin<T>;

export { defineEnum };
