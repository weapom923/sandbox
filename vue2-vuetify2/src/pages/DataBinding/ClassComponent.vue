<template>
  <v-form>
    <h1>Class Component</h1>
    <v-btn v-on:click="$emit('update:val', 'xyz')">update value</v-btn>
    <v-btn v-on:click="$emit('update:arr', [ 'x', 'y', 'z' ])">update array</v-btn>
    <v-btn v-on:click="$emit('update:obj', { a: 'x', b: 'y', c: 'z' })">update obj</v-btn>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from "vue-property-decorator";

@Component
export default class ClassComponent extends Vue {
  @PropSync({ required: true }) val!: string;
  @PropSync({ required: true }) arr!: string[];
  @PropSync({ required: true }) obj!: Record<string, string>;
}
</script>