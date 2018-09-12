<template>
   <input class="slider is-fullwidth" orient="vertical" v-model="current" step="0.1" min="0" max="1" type="range" @input="getValue" >
</template>

<script>
export default {
  name: "BaseFaderControl",
  props: {
    defvalue: {
      type: Number,
      default: 0
    },
    param: String
  },
  data() {
    return {
      current: this.defvalue
    };
  },
  methods: {
    getValue() {
      console.log(this.current);
      this.$emit(`changing-${this.param}`);
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
