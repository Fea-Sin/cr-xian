# cr-xian

react component based on antV, for table data visualization

表格数据可视化为弦图


## ✨ Example View
<img src='./github/example2.png' alt='example' />

##  📦 Installation
```jsx
cnpm install --save cr-xian
or 
npm install --save cr-xian
```

## 🔨 Usage
<img src='./github/data-example.png' alt='example' />

```js
import React, { PureComponent } from 'react';
import Xian from 'cr-xian';

const HHeader = ['张三', '李四', '小明']
const VHeader = ['华北', '华南']
const TData = [[20, 18, 42], [63, 51, 130]]

export default class App extends PureComponent {

  render () {
    return (
      <div>
        <Xian HHeader={HHeader} VHeader={VHeader} TData={TData}  />
      </div>
    )
  }
}
```

## 💡 Api
name | type | description
-----| -----| ------------
HHeader | array | 表头数组
VHeader | array | 列表头数组
TData | array | 表格主数据

##  Development

```
cnpm install
npm start
```

## Example

http://localhost:8018/examples/testOne.html

## Test
  ```js
  npm test
  
  npm run coverage
  ```



## License

MIT
