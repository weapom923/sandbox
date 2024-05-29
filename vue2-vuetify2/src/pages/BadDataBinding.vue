<template>
  <v-row>
    <v-col cols="12">
      <v-btn v-on:click="$nextTick($forceUpdate)">Force Rerender</v-btn>
    </v-col>
    <v-col cols="6">Value Reactive: {{ $data.$_valReactive1 }}</v-col>
    <v-col cols="6">Value Missing: {{ $data.$_valMissing1 }}</v-col>
    <v-col cols="4">Array Reactive: {{ $data.$_arrReactive1 }}</v-col>
    <v-col cols="4">Array Reactive: {{ $data.$_arrReactive2 }}</v-col>
    <v-col cols="4">Array Missing: {{ $data.$_arrNonreactive1 }}</v-col>
    <v-col cols="3">Object Reactive: {{ $data.$_objReactive1 }}</v-col>
    <v-col cols="3">Object Reactive: {{ $data.$_objReactive2 }}</v-col>
    <v-col cols="3">Object Nonreactive: {{ $data.$_objNonreactive1 }}</v-col>
    <v-col cols="3">Object Missing: {{ $data.$_objMissing1 }}</v-col>
    <v-col cols="12">
      <bad-data-binding-sub-component
        v-bind:val-reactive1.sync="$data.$_valReactive1"
        v-bind:val-missing1.sync="$data.$_valMissing1"
        v-bind:arr-reactive1.sync="$data.$_arrReactive1"
        v-bind:arr-reactive2.sync="$data.$_arrReactive2"
        v-bind:arr-missing1.sync="$data.$_arrNonreactive1"
        v-bind:obj-reactive1.sync="$data.$_objReactive1"
        v-bind:obj-reactive2.sync="$data.$_objReactive2"
        v-bind:obj-nonreactive1.sync="$data.$_objNonreactive1"
        v-bind:obj-missing1.sync="$data.$_objMissing1"
      >
      </bad-data-binding-sub-component>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BadDataBindingSubComponent from "@/pages/BadDataBinding/BadDataBindingSubComponent.vue";

export default defineComponent({
  components: { BadDataBindingSubComponent },
  data(): {
    $_valReactive1: number,
    $_valMissing1: number,
    $_arrReactive1: number[],
    $_arrReactive2: number[],
    $_arrNonreactive1: ing[],
    $_objReactive1: Record<string, number>,
    $_objReactive2: Record<string, number>,
    $_objNonreactive1: Record<string, number>,
    $_objMissing1: Record<string, number>,
  } {
    return {
      $_valReactive1: 0,
      $_valMissing1: 0,
      $_arrReactive1: [],
      $_arrReactive2: [],
      $_arrNonreactive1: [],
      $_objReactive1: {},
      $_objReactive2: {},
      $_objNonreactive1: {},
      $_objMissing1: {},
    };
  },
});
</script>