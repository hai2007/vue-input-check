<template>
  <form
    autocomplete="off"
    novalidate
    ref='form'
  >
    <input
      v-model='test1'
      name='输入框1'
      v-input-check='[test1,"required|maxLength:10|regexp:^\\d{1,5}$"]'
    />
    <input
      v-model='test2'
      name='输入框2'
      v-input-check='[test2,"required"]'
    />
    <button @click.prevent="doSubmit">提交</button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      test1: 1,
      test2: ""
    };
  },
  methods: {
    doSubmit: function() {
      // 获取判断是否合法的方法
      this.$validateCheck(
        this.$refs.form,
        function() {
          console.log("表单合法");
          //   console.log(this);
          //   this.test2='777';
        },
        function(error) {
          alert(error.$error);
          error.$el.focus();
        }
      );
    }
  }
};
</script>
