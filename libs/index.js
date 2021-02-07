
import inputCheck from './input-check';
import xhtml from '@hai2007/tool/xhtml';
import { errorinfo, validate } from './validate';
import { isFunction, isArray } from '@hai2007/tool/type';

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

        if (options) {

            // 对于外界自定义的校验规则，进行追加
            if (isArray(options.validate)) {
                for (var i = 0; i < options.validate.length; i++) {

                    var inputValidateItem = options.validate[i];

                    // 先判断校验规则是否已经定义
                    if (inputValidateItem.name in validate) {
                        console.error('This rule already exists : ' + inputValidateItem.name + " !");
                    }

                    // 否则就挂载进去
                    else {

                        // 1.挂载规则
                        validate[inputValidateItem.name] = inputValidateItem.test;

                        // 2.规则错误提示
                        errorinfo.push([inputValidateItem.name, inputValidateItem.message]);

                    }

                }
            }

        }

        Vue.directive('inputCheck', {

            bind: function (el, binding) {
                window.setTimeout(function () {
                    inputCheck(el, binding, validate);
                }, 100);
            },

            update: function (el, binding) {
                window.setTimeout(function () {
                    inputCheck(el, binding, validate);
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
