<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>Hello, World</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ClassComponent extends Vue {}
</script>