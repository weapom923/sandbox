<template>
  <modal-card-base
    title="Test Modal"
    v-bind:data="$data.$_testData"
    v-bind:actions="actions"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-slot:content>
      <v-card-text>
        <v-text-field
          type="number"
          v-model.number="$data.$_testData.x"
        >
        </v-text-field>
      </v-card-text>
      <v-card-text>
        <v-text-field
          type="number"
          v-model.number="$data.$_testData.y"
        >
        </v-text-field>
      </v-card-text>
      <v-card-text>
        <v-text-field
          type="number"
          v-model.number="$data.$_testData.z"
        >
        </v-text-field>
      </v-card-text>
    </template>
  </modal-card-base>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ModalCardBase, { CardAction } from "@/components/ModalCardBase.vue";

type TestData = {
  x: number,
  y: number,
  z: number,
};

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
          id: "test",
          label: "Test",
          callback: (data: TestData) => { console.log("Test", data) },
        },
        {
          id: "cancel",
          callback: () => { console.log("Cancel") },
        },
        {
          id: "ok",
          callback: (data: TestData) => { console.log("OK", data) },
        },
      ]
    }
  },

  data(): {
    $_testData: TestData,
  } {
    return {
      $_testData: { x: 1, y: 2, z: 3 },
    };
  },
});
</script>