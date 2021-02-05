import { validate } from './validate';
import xhtml from '@hai2007/tool/xhtml';

/**
 * 表单校验【校验执行者】
 * -------------------------
 * 使用方法：
 * v-input-check:[val,'规则s']
 * 具体的可用规则可自定义，在文件validate.js中定义或查看
 */

export default function (el, binding) {

    // 此表单是否合法
    var isValid = true;

    // 传递的规则
    var ruls = binding.value.length > 1 ? binding.value[1].split("|") : [],
        rul, rulName, temp;

    // 迭代计算每个规则是否满足
    for (var i = 0; i < ruls.length; i++) {

        rul = ruls[i].split(":");
        // 获取具体的规则方法
        rulName = rul[0];

        rul[0] = binding.value[0];

        // 求解是否满足规则
        rul.unshift(el);
        temp = (validate[rulName] || function () { return true; }).apply({}, rul);

        if (temp) {

            xhtml.removeClass(el, 'v-invalid-' + rulName);
            xhtml.addClass(el, 'v-valid-' + rulName);

        } else {

            xhtml.addClass(el, 'v-invalid-' + rulName);
            xhtml.removeClass(el, 'v-valid-' + rulName);

            // 如果不合法需要标记一下
            isValid = false;
        }

    }

    if (isValid) {
        // 此输入框合法
        xhtml.addClass(el, 'v-valid');
        xhtml.removeClass(el, 'v-invalid');
    } else {
        // 此输入框非法
        xhtml.addClass(el, 'v-invalid');
        xhtml.removeClass(el, 'v-valid');
    }

    // 修改表单form的合法性
    var formNode = el.parentElement;
    while (formNode && formNode.nodeName.toLowerCase() != 'form') formNode = formNode.parentElement;
    if (formNode) {
        var invalids = xhtml.find(formNode, function (temp) {
            return xhtml.hasClass(temp, 'v-invalid');
        });
        if (invalids.length > 0) {

            // 表单存在非法
            xhtml.addClass(formNode, 'v-invalid');
            xhtml.removeClass(formNode, 'v-valid');
        } else {

            // 表单合法
            xhtml.addClass(formNode, 'v-valid');
            xhtml.removeClass(formNode, 'v-invalid');
        }
    } else {
        throw new Error('You need a form to wrap the input box!');
    }

};
