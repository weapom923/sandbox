<template>
  <div class="d-flex flex-column">
    <h1>Class Component</h1>
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
import { Vue, Component, PropSync } from "vue-property-decorator";

@Component
export default class ClassComponent extends Vue {
  @PropSync("val", { required: true }) $_val!: string;
  @PropSync("arr", { required: true }) $_arr!: string[];
  @PropSync("obj", { required: true }) $_obj!: Record<string, string>;
}
</script>