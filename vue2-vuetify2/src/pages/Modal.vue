<template>
  <div>
    <v-row v-if="$data.$_data">
      <v-col cols="3">
        <v-text-field
          label="num"
          readonly
          type="number"
          v-bind:value="$data.$_data.num"
        >
        </v-text-field>
      </v-col>

      <v-col cols="3">
        <v-text-field
          label="str"
          readonly
          v-bind:value="$data.$_data.str"
        >
        </v-text-field>
      </v-col>

      <v-col cols="3">
        <v-switch
          label="flag"
          readonly
          v-bind:value="$data.$_data.flag"
        >
        </v-switch>
      </v-col>

      <v-col cols="3">
        <v-date-picker
          readonly
          v-bind:value="$_timeString"
        >
        </v-date-picker>
      </v-col>
    </v-row>

    <modal-window
      v-bind:component-name="$data.$_modalName"
      v-bind="$_props[$data.$_modalName]"
      v-on:test="$_onTest"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-row>
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

          <v-btn
            v-bind="attrs"
            v-on="on"
            v-on:click="$data.$_modalName = 'dataEditorModalCard'"
          >
            Data Editor Modal
          </v-btn>
        </v-row>
      </template>
    </modal-window>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ModalWindow from "@/components/ModalWindow.vue";
import TestModalCard from "@/components/TestModalCard.vue";
import SimpleModalCard from "@/components/SimpleModalCard.vue";
import DataEditorModalCard, { Data } from "@/components/DataEditorModalCard.vue";

export default defineComponent({
  components: {
    ModalWindow,
  },

  computed: {
    $_props(): {
      testModalCard: InstanceType<typeof TestModalCard>['$props'],
      simpleModalCard: InstanceType<typeof SimpleModalCard>['$props'],
      dataEditorModalCard: InstanceType<typeof DataEditorModalCard>['$props'],
    } {
      return {
        testModalCard: {},
        simpleModalCard: { text: 'Simple Modal Card' },
        dataEditorModalCard: {
          okCallback: (data: Data) => { this.$data.$_data = data },
          draggable: true,
          menuProps: {
            closeOnClick: false,
          },
        },
      };
    },

    $_timeString(): string {
      return this.$data.$_data.time.toISOString().slice(0, 10);
    },
  },

  data(): {
    $_modalName: 'testModalCard',
    $_data?: Data,
  } {
    return {
      $_modalName: 'testModal',
      $_data: undefined,
    };
  },

  methods: {
    $_onTest() {
      console.log('onTest');
    },
  },
});
</script>