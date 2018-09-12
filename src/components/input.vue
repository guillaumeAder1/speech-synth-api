<template>    
    <input type="text" class="input is-info" v-bind="$attrs" v-model="str" @keyup="callback(str)" @blur="callback(str)"/>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    defaultvalue: String,
    callback: Function
  },
  data() {
    return {
      textStr: this.defaultvalue,
      str: ""
    };
  }
};
</script>

<style scoped>
</style>
