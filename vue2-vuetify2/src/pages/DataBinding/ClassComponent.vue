<template>
  <v-form>
    <h1>Class Component</h1>
    <v-btn v-on:click="$_val = 'xyz'">update value</v-btn>
    <v-btn v-on:click="$_arr = [ 'x', 'y', 'z' ]">update array</v-btn>
    <v-btn v-on:click="$_obj = { a: 'x', b: 'y', c: 'z' }">update obj</v-btn>
    <v-text-field v-model="$_val"></v-text-field>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from "vue-property-decorator";

@Component
export default class ClassComponent extends Vue {
  @PropSync("val", { required: true }) $_val!: string;
  @PropSync("arr", { required: true }) $_arr!: string[];
  @PropSync("obj", { required: true }) $_obj!: Record<string, string>;
}
</script>