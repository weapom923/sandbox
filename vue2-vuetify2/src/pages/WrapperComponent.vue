<template>
  <div id="container" class="d-flex flex-row justify-center overflow-y-auto">
    <div>
      <auto-close-v-menu
        v-if="$data.$_scrollElement"
        v-bind:scroll-element="$data.$_scrollElement"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-on="on" v-bind="attrs">activate</v-btn>
        </template>

        <v-list>
          <v-list-item>dummy list 1</v-list-item>
          <v-list-item>dummy list 2</v-list-item>
          <v-list-item>dummy list 3</v-list-item>
        </v-list>
      </auto-close-v-menu>
    </div>
  </div>
</template>

<style scoped>
div#container {
  height: 200px;
}
div#container > div {
  height: 300px;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import AutoCloseVMenu from "@/components/AutoCloseVMenu.vue";

export default defineComponent({
  components: {
    AutoCloseVMenu,
  },

  data(): {
    $_scrollElement?: HTMLDivElement,
  } {
    return {
      $_scrollElement: undefined,
    };
  },

  mounted() {
    this.$data.$_scrollElement = this.$el;
  }
});
</script>