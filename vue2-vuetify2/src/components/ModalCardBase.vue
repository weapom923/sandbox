<template>
  <v-card
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot
      name="title"
      v-if="title"
      v-bind:title="title"
    >
      <v-card-title>{{ title }}</v-card-title>
    </slot>

    <div
      v-if="'content' in $scopedSlots"
      v-on:mousedown.stop
    >
      <slot name="content"></slot>
    </div>

    <v-card-text
      v-else
      v-on:mousedown.stop
    >
      <slot name="default"></slot>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <template v-for="action of actions">
        <slot
          v-if="action.id === 'ok'"
          name="action.ok"
          v-bind:label="$_okLabel"
          v-bind:disabled="action.disabled"
          v-bind:callback="$_getCallback(action.id, action.callback)"
        >
          <v-btn
            color="primary"
            v-bind:disabled="action.disabled"
            v-on:click="$_getCallback(action.id, action.callback)()"
            v-on:mousedown.stop
          >
            <v-icon v-if="action.prependIcon">{{ action.prependIcon }}</v-icon>
            {{ $_okLabel }}
            <v-icon v-if="action.appendIcon">{{ action.appendIcon }}</v-icon>
          </v-btn>
        </slot>

        <slot
          v-else-if="action.id === 'cancel'"
          name="action.cancel"
          v-bind:label="$_cancelLabel"
          v-bind:disabled="action.disabled"
          v-bind:callback="$_getCallback(action.id, action.callback)"
        >
          <v-btn
            v-bind:disabled="action.disabled"
            v-on:click="$_getCallback(action.id, action.callback)()"
            v-on:mousedown.stop
          >
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
          <v-btn
            v-bind:disabled="action.disabled"
            v-on:click="$_getCallback(action.id, action.callback)()"
            v-on:mousedown.stop
          >
            <v-icon v-if="action.prependIcon">{{ action.prependIcon }}</v-icon>
            {{ action.label }}
            <v-icon v-if="action.appendIcon">{{ action.appendIcon }}</v-icon>
          </v-btn>
        </slot>
      </template>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
:deep(.v-card__title),
:deep(.v-card__actions) {
  user-select: none;
}
</style>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export type CardAction = {
  id: string;
  label?: string;
  prependIcon?: string;
  appendIcon?: string;
  callback?: (data?: any) => void;
  disabled?: boolean;
};

export default defineComponent({
  props: {
    title: { type: String },
    text: { type: String },
    actions: { type: Array as PropType<CardAction[]> },
  },

  computed: {
    $_okLabel(): string { return 'OK' },
    $_cancelLabel(): string { return 'Cancel' },
  },

  mounted() {
    this.$emit('mounted', this);
  },

  beforeDestroy() {
    this.$emit('beforeDestroy', this);
  },

  methods: {
    $_getCallback(id: string, actionCallback?: (data?: any) => void): () => void {
      return () => {
        if (actionCallback) actionCallback();
        this.$emit(id);
      };
    },
  },
});
</script>