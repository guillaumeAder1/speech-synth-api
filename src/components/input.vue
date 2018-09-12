<template>    
    <input type="text" class="input is-info" placeholder="textStr" v-model="str" @keyup="callback(str)" @blur="callback(str)"/>
</template>

<script>
export default {
  name: "BaseInput",
  props: ["defaultvalue", "callback"],
  data() {
    return {
      textStr: this.defaultvalue,
      str: ""
    };
  }
};
</script>

<style scoped>
.input {
  width: 50%;
}
</style>
