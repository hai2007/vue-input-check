import Vue from 'vue';

// 引入启动界面
import App from './App.vue';

// 引入基础样式
import '@hai2007/style/normalize.css';

// 引入表单校验插件
import inputCheck from '../libs/index';
Vue.use(inputCheck, {

    // 自定义校验规则
    validate: [{
        name: "phone",
        test: function (el, val) {
            return (val + "").length == 11;
        },
        message: function (el, name) {
            return "电话号码格式不正确：" + name;
        }
    }]

});

//根对象
window.vm = new Vue({

    //挂载点
    el: document.getElementById('root'),

    // 启动vue
    render: function (createElement) {
        return createElement(App);
    }
});
