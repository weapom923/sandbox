<template>
  <div>
    <div>{{ hoge }}</div>
    <div>{{ fuga }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data(): {
    hoge?: string,
  } {
    return {
      hoge: undefined,
    };
  },

  computed: {
    fuga(): string {
      const computedProperty = 'FUGA';
      this.$emit('event', `referred(fuga: ${computedProperty})`)
      return computedProperty;
    },
  },

  watch: {
    hoge: {
      immediate: true,
      handler(value: number) {
        this.$emit('event', `watch(hoge: ${value})`);
      },
    },
  },

  beforeCreate() {
    this.$emit('event', '## beforeCreate');
  },

  created() {
    this.$emit('event', '## created');
    this.hoge = 'HOGE';
    this.$emit('event', "this.hoge = 'HOGE'");
  },

  beforeMount() {
    this.$emit('event', '## beforeMount');
  },

  mounted() {
    this.$emit('event', '## mounted');
  },

  beforeDestroy() {
    this.$emit('event', '## beforeDestroy');
  },

  destroyed() {
    this.$emit('event', '## destroyed');
  },
});
</script>