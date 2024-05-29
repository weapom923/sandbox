<template>
  <div>
    <sub-class-component
      title="Title from props"
      v-model="$data.$_modelValue"
      v-bind:prop-value.sync="$data.$_propValue"
    >
    </sub-class-component>
    <div>modelValue: {{ $data.$_modelValue }}</div>
    <div>propValue: {{ $data.$_propValue }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SubClassComponent from "@/components/SubClassComponent.vue";

@Component({
  components: {
    SubClassComponent,
  },
  data(): {
    $_propValue: number,
    $_modelValue: number,
  } {
    return {
      $_propValue: 1,
      $_modelValue: 1,
    };
  },
})
export default class ClassComponentBasic extends Vue {}
</script>