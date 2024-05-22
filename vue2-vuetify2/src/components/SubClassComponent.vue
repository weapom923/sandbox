<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        v-model="$data.$_formValid"
      >
        <v-text-field
          type="number"
          v-model.number="$_value"
          v-bind:rules="$_rules.value"
        ></v-text-field>

        <v-text-field
          v-model="$data.$_reactiveText"
          v-bind:rules="$_rules.reactiveText"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn>cancel</v-btn>
      <v-btn
        color="primary"
        v-bind:disabled="!$data.$_formValid"
        v-on:click="ok"
      >OK</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Emit, Vue } from "vue-property-decorator";

export type Result = {
  reactiveText: string,
  value: number,
};

@Component({
  data(): {
    $_reactiveText: string,
    $_formValid: boolean,
  } {
    return {
      $_reactiveText: "",
      $_formValid: true,
    };
  },
})
export default class SubClassComponent extends Vue {
  @Prop({ required: true }) title!: string;

  @PropSync("value", { required: true }) $_value!: number;

  get $_rules(): Record<string, unknown> {
    return {
      value: [
        (x: number) => x > 5 || "value must be greater than 5",
      ],
      reactiveText: [
        (x: string) => x.length > 5 || "text must be longer than 5 characters",
        (x: string) => x.length < 10 || "text must be less than 10 characters",
      ],
    };
  }

  mounted(): void {
    this.$refs.form.validate();
  }

  @Emit()
  ok(): Result {
    return {
      reactiveText: this.$data.$_reactiveText,
      value: this.$_value,
    };
  }
}
</script>