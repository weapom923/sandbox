<template>
  <v-dialog v-model="$data.$_modalOpen">
    <template v-slot:activator="{ on, attrs }">
      <div>
        <v-btn
          v-bind="attrs"
          v-on="on"
          v-on:click="$data.$_modalName = 'testModalCard'"
        >
          Test Modal
        </v-btn>

        <v-btn
          v-bind="attrs"
          v-on="on"
          v-on:click="$data.$_modalName = 'simpleModalCard'"
        >
          Simple Modal
        </v-btn>
      </div>
    </template>

    <component
      v-bind:key="$data.$_modalName"
      v-bind:is="$data.$_modalName"
      v-bind="props[$data.$_modalName]"
      v-on:ok="closeModal"
      v-on:cancel="closeModal"
    ></component>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TestModalCard from "@/components/TestModalCard.vue";
import SimpleModalCard from "@/components/SimpleModalCard.vue";

export default defineComponent({
  components: {
    TestModalCard,
    SimpleModalCard,
  },

  computed: {
    props(): {
      testModalCard: InstanceType<typeof TestModalCard>['$props'],
      simpleModalCard: InstanceType<typeof SimpleModalCard>['$props'],
    } {
      return {
        testModalCard: {},
        simpleModalCard: { text: 'Simple Modal Card' },
      };
    }
  },

  data(): {
    $_modalName: 'testModalCard',
    $_modalOpen: boolean,
  } {
    return {
      $_modalName: 'testModal',
      $_modalOpen: false,
    };
  },

  methods: {
    closeModal() {
      this.$data.$_modalOpen = false;
      console.log('closeModal');
    },
  },
});
</script>