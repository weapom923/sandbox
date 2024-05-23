<template>
  <v-menu
    ref="modalWindow"
    absolute
    origin="center center"
    v-model="$data.$_modalOpen"
    transition="scale-transition"
    v-bind:close-on-content-click="false"
    v-bind:position-x="$_modalPositionX"
    v-bind:position-y="$_modalPositionY"
  >
    <template v-slot:activator="{ on, attrs }">
      <slot
        name="activator"
        v-bind:on="on"
        v-bind:attrs="attrs"
      >
      </slot>
    </template>

    <template v-slot:default>
      <component
        width="600"
        max-width="100%"
        v-bind:key="componentName"
        v-bind:is="componentName"
        v-bind="$attrs"
        v-on:ok="$_closeModal"
        v-on:cancel="$_closeModal"
        v-on:mounted="$_registerModalCard"
        v-on:mousedown="$_onMousedown"
        v-on="$listeners"
      >
      </component>
    </template>
  </v-menu>
</template>

<script lang="ts">
import { VCard } from "vuetify/lib";
import { defineComponent } from "vue";
import TestModalCard from "@/components/TestModalCard.vue";
import SimpleModalCard from "@/components/SimpleModalCard.vue";
import DataEditorModalCard from "@/components/DataEditorModalCard.vue";

export default defineComponent({
  components: {
    TestModalCard,
    SimpleModalCard,
    DataEditorModalCard,
  },

  props: {
    componentName: { type: String, required: true },
  },

  data(): {
    $_modalOpen: boolean,
    $_modalElement?: HTMLDivElement,
    $_modalOriginX?: number,
    $_modalOriginY?: number,
    $_clientYOnMousedown?: number,
    $_clientXOnMousedown?: number,
    $_clientYOnMousemove?: number,
    $_clientXOnMousemove?: number,
  } {
    return {
      $_modalOpen: false,
      $_modalElement: undefined,
      $_modalOriginX: undefined,
      $_modalOriginY: undefined,
      $_clientYOnMousedown: undefined,
      $_clientXOnMousedown: undefined,
      $_clientYOnMousemove: undefined,
      $_clientXOnMousemove: undefined,
    };
  },

  computed: {
    $_modalPositionX(): number {
      return this.$data.$_modalOriginX + this.$_draggingX;
    },

    $_modalPositionY(): number {
      return this.$data.$_modalOriginY + this.$_draggingY;
    },

    $_isDragging(): boolean {
      return (this.$data.$_clientYOnMousedown !== undefined) && (this.$data.$_clientXOnMousedown !== undefined);
    },

    $_draggingX(): number {
      if (this.$data.$_clientXOnMousedown === undefined) return 0;
      if (this.$data.$_clientXOnMousemove === undefined) return 0;
      return this.$data.$_clientXOnMousemove - this.$data.$_clientXOnMousedown;
    },

    $_draggingY(): number {
      if (this.$data.$_clientYOnMousedown === undefined) return 0;
      if (this.$data.$_clientYOnMousemove === undefined) return 0;
      return this.$data.$_clientYOnMousemove - this.$data.$_clientYOnMousedown;
    },
  },

  watch: {
    componentName() {
      this.$_resetMouseContext();
    },

    '$data.$_modalOpen'(modalOpen: boolean) {
      if (!modalOpen) {
        this.$_resetMouseContext();
      }
    },
  },

  mounted() {
    window.addEventListener('mousemove', this.$_onMousemove);

  },

  methods: {
    $_resetMouseContext() {
      this.$data.$_clientYOnMousedown = undefined;
      this.$data.$_clientXOnMousedown = undefined;
      this.$data.$_clientYOnMousemove = undefined;
      this.$data.$_clientXOnMousemove = undefined;
      if (this.$data.$_modalElement) {
        this.$data.$_modalOriginX = this.$data.$_modalElement.parentNode.offsetLeft;
        this.$data.$_modalOriginY = this.$data.$_modalElement.parentNode.offsetTop;
      }
    },

    $_closeModal() {
      this.$data.$_modalOpen = false;
    },

    async $_registerModalCard(modalCard: InstanceType<VCard>) {
      this.$data.$_modalElement = modalCard.$el as HTMLDivElement
      this.$data.$_modalOriginX = this.$root.$el.clientWidth / 2;
      this.$data.$_modalOriginY = this.$root.$el.clientHeight / 2;
      while (true) {
        if ((this.$data.$_modalElement.clientWidth > 0) && (this.$data.$_modalElement.clientHeight > 0)) break;
        await new Promise(resolve => setTimeout(resolve, 10));
      }
      this.$data.$_modalOriginX -= this.$data.$_modalElement.clientWidth / 2;
      this.$data.$_modalOriginY -= this.$data.$_modalElement.clientHeight / 2;
    },

    $_onMousedown(event: MouseEvent) {
      this.$data.$_clientXOnMousedown = event.clientX;
      this.$data.$_clientYOnMousedown = event.clientY;
    },

    $_onMousemove(event: MouseEvent) {
      if (!this.$_isDragging) return;
      if (event.buttons > 0) {
        this.$data.$_clientXOnMousemove = event.clientX;
        this.$data.$_clientYOnMousemove = event.clientY;
      } else {
        this.$_onMouseup(event);
      }
    },

    $_onMouseup(event: MouseEvent) {
      this.$data.$_clientXOnMousemove = event.clientX;
      this.$data.$_clientYOnMousemove = event.clientY;
      this.$data.$_modalOriginX = this.$_modalPositionX;
      this.$data.$_modalOriginY = this.$_modalPositionY;
      this.$nextTick(() => { this.$_resetMouseContext() });
    },
  },
});
</script>