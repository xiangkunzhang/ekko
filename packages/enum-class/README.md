# ekko-enum

枚举帮助方法

## 安装

```nodemon
npm install ekko-enum
```

## 使用

- 引用

```javascript
import { defineEnum} from 'ekko-enum'
```

- 初始化

```javascript
  const name = 'category'
  const enums = [
    { value: 1, label: 'test1' },
    { value: 2, label: 'test2' },
    { value: 3, label: 'test3', other: { a: ''} }
  ]
 const useCategoryEnum = defineEnum(name, enums)
或
 const useCategoryEnum = defineEnum({ name, enums })
```

- 使用

```javascript
const categoryEnum = useCategoryEnum()
const label=categoryEnum.string(1)
console.log(label)
```

- 输出

>test1

## License

[MIT](LICENSE)
