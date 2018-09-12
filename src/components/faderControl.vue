<template>
   <input class="slider is-fullwidth" orient="vertical" v-model="value" step="0.1" min="0" max="1" type="range" @input="getValue" >
</template>

<script>
export default {
  name: "BaseFaderControl",
  props: [],
  data() {
    return {
      value: 0.5
    };
  },
  methods: {
    getValue() {
      console.log(this.value);
      //   this.$emit();
    }
  }
};
</script>

<style >
input[type="range"][orient="vertical"] {
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: slider-vertical; /* WebKit */
  width: 8px;
  height: 175px;
  padding: 0 5px;
}
</style>
