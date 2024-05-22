<template>
  <v-card
    v-on="$listeners"
    v-bind="$attrs"
    v-bind:height="height"
    v-bind:width="width"
    v-bind:style="$_style"
  >
    <v-card-title class="pa-2 text-subtitle-2 text-center justify-center">
      <slot name="label"></slot>
    </v-card-title>

    <v-card-text class="pa-0 text-center">
      <slot name="count"></slot>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    height: { type: Number, required: true },
    width: { type: Number, required: true },
  },

  computed: {
    $_style(): CSSStyleDeclaration {
      return {
        top: `-${this.height / 2}px`,
      };
    },
  },
});
</script>