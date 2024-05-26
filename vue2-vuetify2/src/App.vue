<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-select
            v-bind:value="$route.path"
            v-bind:items="urls"
            v-on:input="$router.push($event)"
          >
          </v-select>
        </v-row>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup(): {
    urls: string[],
  } {
    return {
      urls: [
        '/hello-world/options-api',
        '/hello-world/class-component',
        '/data-binding',
        '/wrapper-component',
        '/throw-errors',
        '/theme',
        '/cyclic-tree',
        '/class-component-basic',
        '/modal',
        '/bad-data-binding',
        '/life-cycle-hooks',
      ],
    };
  },
});
</script>