<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <div ref="ref">Height of this box: {{ $data.$_height }}</div>

      <v-text-field
        label="modelValue"
        type="number"
        v-model.number="modelValue"
      ></v-text-field>
      <div>modelValue: {{ modelValue }}</div>

      <v-text-field
        label="propValue"
        type="number"
        v-model.number="$_propValue"
      ></v-text-field>
      <div>propValue: {{ $_propValue }}</div>

      <v-text-field
        label="dataValue"
        type="number"
        v-model="$data.$_dataValue"
      ></v-text-field>
      <div>dataValue: {{ $data.$_dataValue }}</div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, PropSync, Vue, VModel, Ref} from "vue-property-decorator";

@Component({
  data(): {
    $_dataValue: number,
    $_height?: number,
  } {
    return {
      $_dataValue: 1,
      $_height: undefined,
    };
  },
})
export default class SubClassComponent extends Vue {
  @Prop({ required: true }) readonly title!: string;

  @PropSync('propValue', { required: true }) $_propValue!: number;

  @VModel({ required: true }) modelValue!: number;

  @Ref() readonly ref!: HTMLDivElement;

  mounted() {
    this.$data.$_height = this.ref.clientHeight;
  }
}
</script>