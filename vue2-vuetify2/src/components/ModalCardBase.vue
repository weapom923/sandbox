<template>
  <v-card>
    <slot
      name="title"
      v-if="title"
      v-bind:title="title"
    >
      <v-card-title>{{ title }}</v-card-title>
    </slot>

    <slot
      v-if="'content' in $scopedSlots"
      name="content"
    >
    </slot>

    <v-card-text v-else>
      <slot name="default"></slot>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <template v-for="action of actions">
        <slot
          v-if="action.id === 'ok'"
          name="action.ok"
          v-bind:label="$_okLabel"
          v-bind:callback="$_getCallback(action.id, action.callback)"
        >
          <v-btn v-on:click="$_getCallback(action.id, action.callback)()">
            <v-icon v-if="action.prependIcon">{{ action.prependIcon }}</v-icon>
            {{ $_okLabel }}
            <v-icon v-if="action.appendIcon">{{ action.appendIcon }}</v-icon>
          </v-btn>
        </slot>

        <slot
          v-else-if="action.id === 'cancel'"
          name="action.cancel"
          v-bind:label="$_cancelLabel"
          v-bind:callback="$_getCallback(action.id, action.callback)"
        >
          <v-btn v-on:click="$_getCallback(action.id, action.callback)()">
            <v-icon v-if="action.prependIcon">{{ action.prependIcon }}</v-icon>
            {{ $_cancelLabel }}
            <v-icon v-if="action.appendIcon">{{ action.appendIcon }}</v-icon>
          </v-btn>
        </slot>

        <slot
          v-else
          v-bind:name="`action.${action.id}`"
          v-bind:label="action.label"
          v-bind:callback="$_getCallback(action.id, action.callback)"
        >
          <v-btn v-on:click="$_getCallback(action.id, action.callback)()">
            <v-icon v-if="action.prependIcon">{{ action.prependIcon }}</v-icon>
            {{ action.label }}
            <v-icon v-if="action.appendIcon">{{ action.appendIcon }}</v-icon>
          </v-btn>
        </slot>
      </template>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export type CardAction = {
  id: string;
  label?: string;
  prependIcon?: string;
  appendIcon?: string;
  callback?: (data?: any) => void;
};

export default defineComponent({
  props: {
    title: { type: String },
    text: { type: String },
    actions: { type: Array as PropType<CardAction[]> },
    data: { type: Object as PropType<any> },
  },

  computed: {
    $_okLabel(): string { return 'OK' },
    $_cancelLabel(): string { return 'Cancel' },
  },

  methods: {
    $_getCallback(id: string, actionCallback?: (data?: any) => void): () => void {
      return () => {
        if (actionCallback) actionCallback(this.data);
        this.$emit(id);
      };
    },
  },
});
</script>