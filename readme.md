# 粒子动画
基于 Three.js 封装的一个小的粒子动画库，为了更方便的创建粒子动画，不用去繁复的查找 API。
包含随机粒子的创建和带顶点信息模型的创建，以及粒子的运动。

## 运行项目

安装 parcel

```bash
# Install with yarn:
yarn global add parcel-bundler
# or with npm:
npm install -g parcel-bundler
```

安装依赖

```
yarn install
```

运行：

```
parcel demo.html
```

### 查看 API 文档
本项目可以使用 [jsdef](https://www.npmjs.com/package/jsdef) 来查看的文档。

安装：
```bash
# Install with yarn:
yarn global add jsdef
# or with npm:
npm install -g jsdef
```

运行：

```bash
jsdef parse
jsdef watch-server
```

打开 http://localhost:8800/#/api 查看相关 API 文档。

## 开始使用

## 一些小 tips
一般粒子使用 Tween.js 来控制动画，此库对动画的运动轨迹以及表现形式不做处理，需自行研究。
这里分享一些个人遇到的坑以及注意事项等：

- Tween 官方目前不支持嵌套语法，参见[issue #78](https://github.com/tweenjs/tween.js/issues/78) 等，不过也有人提了[相关的pr](https://github.com/tweenjs/tween.js/pull/366) 正在进行 code review，如果不急可以等一等，急的话就自己参考着撸吧。

- 动画过渡的时候如果觉得生硬，可以尝试一下让粒子随机延迟运动，而不是齐步走的状态 :)
```javascript
tween.delay(animationDuration * Math.random());
```

- 对于多场景切换的动画，理论上就是粒子坐标的变换。但是如果粒子数量不同，这里提供一个解决方案：
    - 先读取所有的模型的顶点信息，得到顶点数最多的模型。初始化的时候就创建这么多粒子，其他场景不用的时候就全部重叠在一起。比如三个模型，分别包含 9000个粒子，10000个粒子和9500个粒子，初始化的时候就创建10000个粒子，在第一个场景中多余的1000个堆叠在一起就好了。

- 屏幕 `resize` 的时候，摄像机会重新计算投影矩阵。模型的坐标通常是以屏幕中心点为参考系，大小会根据屏幕的变化做一定的缩放。所以如果需要在模型上创建 dom 的时候，对于位置的自适应可以考虑用 `vw` 和 `vh` 来计算。

- 调试模式下，调用的是stats.js， 很蛋疼的作者在代码里写死了 fixed 定位，如果要改就去 node_modules 把 stats.min.js 的相关样式给去了 🤷‍）
## Feature
- [] 文本粒子的创建
