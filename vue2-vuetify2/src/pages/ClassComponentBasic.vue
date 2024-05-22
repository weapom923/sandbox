<template>
  <div>
    <sub-class-component
      title="hoge"
      v-bind:value.sync="$data.$_value"
      v-on:ok="onOk"
    >
    </sub-class-component>
    <div>value: {{ $data.$_value }}</div>
    <div v-if="$data.$_result">result: {{ $data.$_result }}</div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SubClassComponent, { Result } from "@/components/SubClassComponent.vue";

@Component({
  components: {
    SubClassComponent,
  },
  data(): {
    $_value: number,
    $_result?: Result,
  } {
    return {
      $_value: 1,
      $_result: undefined,
    };
  },
})
export default class ClassComponentBasic extends Vue {
  onOk(result: Result): void {
    this.$data.$_result = result;
  }
}
</script>