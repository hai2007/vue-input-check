// 自定义校验规则
export var validate = {

    // required:flag
    "required": function (el, val, flag) {
        if (flag === 'false' || flag === false) {
            return true;
        } else {
            if (val && !/^ +$/.test(val)) {
                return true;
            }
        }
        return false;
    },

    // maxLength:num
    "maxLength": function (el, val, num) {
        val = (val + "").trim();
        return val.length <= num;
    },

    // minLength:num
    "minLength": function (el, val, num) {
        val = (val + "").trim();
        return val.length >= num;
    },

    // regexp:str
    "regexp": function (el, val, str) {
        el._hai2007_vue_input_check_regexp_ = str;
        return new RegExp(str).test(val);
    }

};

// 自定义错误提示
// 请和上面的对应起来，上面未定义的采用默认提示
export var errorinfo = [

    // 必输
    ["required", function (el, name) {
        return name + "是必输项！";
    }],

    // 下拉
    ["select", function (el, name) {
        return name + "下拉key非法！";
    }],

    // 最大长度
    ["maxLength", function (el, name) {
        return name + "超过最大长度！";
    }],

    // 最短长度
    ["minLength", function (el, name) {
        return name + "短于最短长度！";
    }],

    // 正则表达式
    ["regexp", function (el, name) {
        return name + "不满足正则表达式：" + el._hai2007_vue_input_check_regexp_;
    }]

];
