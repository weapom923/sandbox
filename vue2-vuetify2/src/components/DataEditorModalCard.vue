<template>
  <modal-card-base
    title="Test Modal"
    v-bind:title="$_title"
    v-bind:data="$data.$_tempData"
    v-bind:actions="$_actions"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-form ref="form" v-model="$data.$_isFormValid">
      <v-text-field
        label="num"
        type="number"
        v-bind:rules="rules.num"
        v-model.number="$data.$_tempData.num"
      >
      </v-text-field>
      <v-text-field
        label="str"
        v-bind:rules="rules.str"
        v-model="$data.$_tempData.str"
      >
      </v-text-field>
      <v-switch
        label="flag"
        v-bind:rules="rules.flag"
        v-model="$data.$_tempData.flag"
      >
      </v-switch>
      <v-date-picker
        v-model="$_timeString"
      >
      </v-date-picker>
    </v-form>
  </modal-card-base>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ModalCardBase, { CardAction } from "@/components/ModalCardBase.vue";

export type Data = {
  num: number,
  str: string,
  flag: boolean,
  time: Date,
};

export default defineComponent({
  setup(): {
    rules: {
      num: ((x: number) => boolean | string)[],
      str: ((x: string) => boolean | string)[],
      flag: ((x: boolean) => boolean | string)[],
    },
  } {
    return {
      rules: {
        num: [
          (x: number) => x > 5 || "value must be greater than 5",
        ],
        str: [
          (x: string) => x.length > 5 || "text must be longer than 5 characters",
          (x: string) => x.length < 10 || "text must be less than 10 characters",
        ],
        flag: [
          (x: boolean) => x || "flag must be true",
        ],
      },
    };
  },

  components: {
    ModalCardBase,
  },

  props: {
    data: { type: Object as PropType<Data> },
    okCallback: { type: Function as PropType<(data: Data) => void>, required: true },
  },

  data(): {
    $_isFormValid: boolean,
    $_tempData: Data,
  } {
    return {
      $_isFormValid: true,
      $_tempData: {
        num: 0,
        str: '',
        flag: false,
        time: new Date(0),
      },
    };
  },

  mounted() {
    this.$refs.form.validate();
  },

  computed: {
    $_title(): string {
      return (this.data)? 'Edit Data' : 'Create Data';
    },

    $_timeString: {
      get(): string {
        return this.$data.$_tempData.time.toISOString().slice(0, 10);
      },
      set(timeString: string): void {
        this.$data.$_tempData.time = new Date(timeString);
      },
    },

    $_actions(): CardAction[] {
      return [
        {
          id: "cancel",
        },
        {
          id: "ok",
          disabled: !this.$data.$_isFormValid,
          callback: () => {
            this.okCallback({
              num: this.$data.$_tempData.num,
              str: this.$data.$_tempData.str,
              flag: this.$data.$_tempData.flag,
              time: new Date(this.$data.$_tempData.time.getTime()),
            });
          },
        },
      ];
    },
  },
});
</script>
