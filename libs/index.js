
import inputCheck from './input-check';
import xhtml from '@hai2007/tool/xhtml';
import { errorinfo } from './validate';
import { isFunction } from '@hai2007/tool/type';

// 获取指定输入框的错误信息
var getError = function (target) {

    if (!xhtml.hasClass(target, "v-invalid")) {
        return null;
    }

    // 记录输入的class
    var input_class = " " + target.getAttribute('class') + " ";

    var inputName = target.getAttribute('name');

    // 设置默认的未自定义错误提示方式的默认提示
    var error = inputName + "输入非法！";

    // 寻找第一个类型的错误
    for (var i = 0; i < errorinfo.length; i++) {
        if (new RegExp(" v-invalid-" + errorinfo[i][0] + " ").test(input_class)) {

            // 调用自定义错误提示确定提示文字
            error = errorinfo[i][1](target, inputName);
            break;
        }
    }

    return {
        "$el": target,
        "$error": error
    };

};

export default {

    // options后续可以添加自定义规则
    // 目前先不支持

    install: function (Vue, options) {

        Vue.directive('inputCheck', {

            bind: function (el, binding) {
                window.setTimeout(function () {
                    inputCheck(el, binding);
                }, 100);
            },

            update: function (el, binding) {
                window.setTimeout(function () {
                    inputCheck(el, binding);
                }, 100);
            }

        });

        Vue.prototype.$validateCheck = function (formnode, callback, errorback) {

            // 如果表单查找不到，报错，以免后续使用报错不容易捕获
            if (!xhtml.isNode(formnode)) throw new Error('Target is empty!');

            else {

                // 如果表单非法
                if (xhtml.hasClass(formnode, 'v-invalid')) {

                    var nodes = formnode.getElementsByTagName('*'), target;

                    // 筛选出来第一个非法输入
                    for (var i = 0; i < nodes.length; i++) {
                        if (xhtml.hasClass(nodes[i], 'v-invalid')) {
                            target = nodes[i];
                            break;
                        }
                    }

                    if (isFunction(errorback)) errorback.call(this, getError(target))
                } else {
                    if (isFunction(callback)) callback.call(this);
                }

            }

        };

    }
};
