<template>
  <v-form class="d-flex flex-column">
    <h1>Options API</h1>
    <v-btn v-on:click="$_val = 'XYZ'">update value</v-btn>
    <v-btn v-on:click="$_arr = [ 'X', 'Y', 'Z' ]">update array</v-btn>
    <v-btn v-on:click="$_obj = { a: 'X', b: 'Y', c: 'Z' }">update obj</v-btn>
    <v-btn v-on:click="$_arr.push('new')">add new data to array</v-btn>
    <v-btn v-on:click="$set($_obj, 'd', 'NEW')">assign new data to obj</v-btn>
    <v-text-field v-model="$_val"></v-text-field>
  </v-form>
</template>

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