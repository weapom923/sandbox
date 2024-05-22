<template>
  <modal-card-base
    title="Simple Modal"
    v-bind:actions="actions"
    v-bind="$attrs"
    v-on="$listeners"
  >
    {{ text }}
  </modal-card-base>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ModalCardBase, { CardAction } from "@/components/ModalCardBase.vue";

export default defineComponent({
  components: {
    ModalCardBase,
  },

  setup(): {
    actions: CardAction[]
  } {
    return {
      actions: [
        {
          id: "cancel",
          callback: () => { console.log("SimpleModalCard - Cancel") },
        },
        {
          id: "ok",
          callback: () => { console.log("SimpleModalCard - OK") },
        },
      ]
    }
  },

  props: {
    text: { type: String, required: true },
  },
});
</script>