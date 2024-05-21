<template>
  <v-menu
    ref="menu"
    v-model="$data.$_isMenuActive"
    v-bind="$attrs"
    v-on="$listeners"
    v-on:input="$_onMenuInput"
  >
    <slot></slot>

    <template
      v-for="(_, slotName) of $scopedSlots"
      v-slot:[slotName]="slotProps"
    >
      <slot
        v-bind:name="slotName"
        v-bind="slotProps"
      >
      </slot>
    </template>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    scrollElement: { type: HTMLElement },
  },

  data(): {
    $_isMenuActive: boolean,
  } {
    return {
      $_isMenuActive: false,
    };
  },

  methods: {
    $_onMenuInput(isMenuActive: boolean) {
      if (this.scrollElement === undefined) return;
      if (isMenuActive) {
        this.scrollElement.addEventListener("scroll", this.$_onScroll);
        this.scrollElement.addEventListener("touchmove", this.$_onScroll);
      } else {
        this.scrollElement.removeEventListener("scroll", this.$_onScroll);
        this.scrollElement.removeEventListener("touchmove", this.$_onScroll);
      }
    },

    $_onScroll() {
      this.$data.$_isMenuActive = false;
      this.$refs.menu.getActivator().blur();
    },
  }
});
</script>