<template>
    <div class="select" >
        <select v-model="selected" name="label" @change="callback(selected)">      
            <option  v-for="(item, index) in list" :key="index" :value="item">
                {{item.name}}
            </option>      
        </select>
    </div>
</template>

<script>
export default {
  name: "BaseDropdown",
  props: ["items", "callback"],
  data() {
    return {
      list: this.items,
      //title: this.label,
      selected: null
    };
  }
};
</script>

<style>
</style>
