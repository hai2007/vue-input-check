# vue-input-check
Template Based Validation Framework for Vue.js.

<p>
  <a href="https://hai2007.gitee.io/npm-downloads?interval=7&packages=vue-input-check"><img src="https://img.shields.io/npm/dm/vue-input-check.svg" alt="downloads"></a>
  <a href="https://packagephobia.now.sh/result?p=vue-input-check"><img src="https://packagephobia.now.sh/badge?p=vue-input-check" alt="install size"></a>
  <a href="https://www.jsdelivr.com/package/npm/vue-input-check"><img src="https://data.jsdelivr.com/v1/package/npm/vue-input-check/badge" alt="CDN"></a>
  <a href="https://www.npmjs.com/package/vue-input-check"><img src="https://img.shields.io/npm/v/vue-input-check.svg" alt="Version"></a>
  <a href="https://github.com/hai2007/vue-input-check/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/vue-input-check.svg" alt="License"></a>
  <a href="https://github.com/hai2007/vue-input-check" target='_blank'>
        <img alt="GitHub repo stars" src="https://img.shields.io/github/stars/hai2007/vue-input-check?style=social">
    </a>
</p>

## 如何使用

首先，在你的```vue```项目中进行安装：

```bash
npm install --save vue-input-check
```

安装完成以后引入并注册：

```js
import inputCheck from 'vue-input-check';

// 安装
Vue.use(inputCheck);
```

然后，我们就可以在表单中使用了：

```html
<form autocomplete="off" novalidate>
    <input v-model='key' name='输入框名称' v-input-check='[key,"validate-express"]'/>
    <!-- 可以有任意多的输入框 -->
</form>
```

如你所见，上述的```v-input-check```就是我们对每个输入框定义规则的地方，值是一个数组，第一个值就是输入框的```v-model```，第二个值是一个字符串，语法如下：

```js
validate-express="val1:param1:param2|val2|valu3:param1"
```

不同的规则使用```|```分割，需要传递参数的规则的参数通过```:```分割。我们来看几个例子：

- ```v-input-check='[key,"required|maxLength:10|regexp:^\\d{1,5}$"]'```
- ```v-input-check='[key,"required"]'```

目前可选的内置规则如下：

- ```required:boolean```:表示必输，有一个可选参数，表示是否必输，默认true
- ```maxLength:num```:最大长度
- ```minLength:num```:最小长度
- ```regexp:str```:正则表达式

页面的规则定义好了以后，你有两中方式获取校验的结果。

### 1.JS的方式

直接使用下列方法启动检查即可：

```js
this.$validateCheck(formnode, callback, errorback);
```

此对象包含三个参数：

- formnode：需要校验的表单结点，必输
- callback：表单合法回调，可选
- errorback：表单非法回调，可选

此外，错误回调有一个形参，数据格式为：

```js
{
    "$el":错误的输入框结点
    "$error":当前输入框的第一个错误提示信息
}
```

### 2.HTML的方式

提供这种方式的目的是为了可以在页面实时反馈当前表单的输入情况。

首先，在表单上，你可以通过判断class包含```v-valid```或者```v-invalid```来判断表单是否合法。

同样的，添加指令```v-input-check```的地方同样可以这样判断该处是否合法，而对于更具体的错误细节，比如必输非法，class就会像这样```v-invalid-required v-invalid```。

## 自定义校验规则

在大部分情况下，我们还可能需要添加新的校验规则，毕竟默认的往往不足以满足所有业务情况：

```js
Vue.use(inputCheck, {

    // 自定义校验规则
    validate: [{

        // 规则的名称
        name: "XXX",

        // 校验方法，返回true表示合法，false表示非法
        // 需要注意的是，这个函数除了el和val一定存在外，余下的参数是使用的时候通过```:```分割传递的，可以有任意多个
        // 比如：``` required:true|phone:parm1:param2 ```
        test: function (el, val, ...) {
            return true|false;
        },

        // 非法提示信息，应该返回一个字符串
        message: function (el, name) {
            return "XXX";
        }
    },
    // 校验规则可以有多条
    ......
    ]

});
```

## 联系我们

- QQ: 2501482523
- Email: 2501482523@qq.com

开源协议
---------------------------------------
[MIT](https://github.com/hai2007/vue-input-check/blob/master/LICENSE)

Copyright (c) 2021 [hai2007](https://hai2007.gitee.io/sweethome/) 走一步，再走一步。
