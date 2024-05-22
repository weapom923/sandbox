<template>
  <v-form>
    <h1>Options API</h1>
    <v-btn v-on:click="$emit('update:val', 'XYZ')">update value</v-btn>
    <v-btn v-on:click="$emit('update:arr', [ 'X', 'Y', 'Z' ])">update array</v-btn>
    <v-btn v-on:click="$emit('update:obj', { a: 'X', b: 'Y', c: 'Z' })">update obj</v-btn>
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
      set(value: string) { this.$emit('update:val', value) },
    },
  }
});
</script>