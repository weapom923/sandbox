<template>
  <div class="d-flex flex-column">
    <h1>Options API</h1>
    <v-btn v-on:click="$_val = 'XYZ'">$_val = 'XYZ'</v-btn>
    <v-btn v-on:click="$_arr = [ 'X', 'Y', 'Z' ]">$_arr = [ 'X', 'Y', 'Z' ]</v-btn>
    <v-btn v-on:click="$_obj = { a: 'X', b: 'Y', c: 'Z' }">$_obj = { a: 'X', b: 'Y', c: 'Z' }</v-btn>
    <v-btn v-on:click="arr.push('new')">arr.push('new')</v-btn>
    <v-btn v-on:click="$_arr.push('new')">$_arr.push('new')</v-btn>
    <v-btn v-on:click="$set(obj, 'd', 'NEW')">$set(obj, 'd', 'NEW')</v-btn>
    <v-btn v-on:click="$set($_obj, 'd', 'NEW')">$set($_obj, 'd', 'NEW')</v-btn>
    <v-text-field v-model="$_val"></v-text-field>
  </div>
</template>

<style scoped>
:deep(.v-btn) {
  text-transform: unset !important;
}
</style>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    val: {
      type: String,
      required: true,
    },
    arr: {
      type: Array as PropType<string[]>,
      required: true,
    },
    obj: {
      type: Object as PropType<Record<string, string>>,
      required: true,
    },
  },

  computed: {
    $_val: {
      get() { return this.val },
      set(val: string) { this.$emit('update:val', val) },
    },
    $_arr: {
      get() { return this.arr },
      set(arr: string[]) { this.$emit('update:arr', arr) },
    },
    $_obj: {
      get() { return this.obj },
      set(obj: Record<string, string>) { this.$emit('update:obj', obj) },
    },
  }
});
</script>