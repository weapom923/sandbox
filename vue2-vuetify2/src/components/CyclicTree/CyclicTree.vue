<template>
  <div
    class="cyclic-tree"
    v-bind:style="$_cyclicTreeStyle"
  >
    <div class="branch">
      <hr v-if="level > 0">
      <cyclic-tree-value-card
        v-bind:width="cardWidth"
        v-bind:height="cardHeight"
      >
        <template #label>
          <slot
            name="label"
            v-bind:label="label"
          >
            {{ label }}
          </slot>
        </template>

        <template #count>
          <slot
            name="count"
            v-bind:count="$_totalChildrenCount"
          >
            {{ $_totalChildrenCount }}
          </slot>
        </template>
      </cyclic-tree-value-card>
      <hr>
    </div>
    <div class="cyclic-sub-tree-row">
      <div
        class="cyclic-sub-tree-column"
        v-for="(_data, _label) in data"
        v-bind:key="_label"
      >
        <cyclic-tree
          v-if="isTreeNode(_data)"
          v-bind:level="level + 1"
          v-bind:label="_label"
          v-bind:data="_data"
          v-on:update="$_updateChildrenCount(_label, $event)"
        >
          <template #label="{ label }">
            <slot
              name="label"
              v-bind:label="label"
            >
              {{ label }}
            </slot>
          </template>

          <template #count="{ count }">
            <slot
              name="count"
              v-bind:count="count"
            >
              {{ count }}
            </slot>
          </template>
        </cyclic-tree>

        <div v-else class="branch">
          <hr>
          <cyclic-tree-value-card
            v-bind:width="cardWidth"
            v-bind:height="cardHeight"
          >
            <template #label>
              <slot
                name="label"
                v-bind:label="_label"
              >
                {{ _label }}
              </slot>
            </template>

            <template #count>
              <slot
                name="count"
                v-bind:count="_data"
              >
                {{ _data }}
              </slot>
            </template>
          </cyclic-tree-value-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
div.cyclic-tree {
  display: flex;
  flex-direction: row;
}

div.branch {
  display: flex;
  flex-direction: row;
  align-items: start;
}

div.cyclic-sub-tree-column,
div.branch > hr {
  border-style: solid;
  border-color: black;
  border-width: 0;
}

div.branch > hr {
  min-width: 20px;
  border-top-width: 1px;
}

div.cyclic-sub-tree-row {
  display: flex;
  flex-direction: column;
}

div.cyclic-sub-tree-column {
  padding-bottom: 10px;
}

div.cyclic-sub-tree-column:not(:last-child) {
  border-left-width: 1px;
}
</style>

<script lang="ts">
import CyclicTreeValueCard from "@/components/CyclicTree/CyclicTreeValueCard.vue";
import { defineComponent, PropType } from "vue";

declare interface TreeNode { [label: string]: TreeNode | number }

export type { TreeNode };

export default defineComponent({
  name: "CyclicTree",

  components: {
    CyclicTreeValueCard,
  },

  props: {
    level: { type: Number, default: 0 },
    label: { type: String, required: true },
    data: { type: Object as PropType<TreeNode>, required: true },
    cardWidth: { type: Number, default: 100 },
    cardHeight: { type: Number, default: 80 },
  },

  data(): {
    $_childrenCount: { [label: string]: number },
  }{
    return {
      $_childrenCount: {},
    };
  },

  computed: {
    $_cyclicTreeStyle(): CSSStyleDeclaration | undefined {
      if (this.level === 0) {
        return {
          paddingTop: `${this.cardHeight / 2}px`,
        };
      }
      return undefined;
    },

    $_totalChildrenCount(): number {
      return Object.values(this.$data.$_childrenCount).reduce((accum, count) => accum + count, 0);
    },
  },

  watch: {
    data: {
      handler(data: TreeNode) {
        for (const [label, value] of Object.entries(data)) {
          if (typeof value === "number") {
            this.$data.$_childrenCount[label] = value;
          }
        }
      },
      immediate: true,
      deep: true,
    },

    $_totalChildrenCount: {
      handler(totalChildrenCount: number) { this.$emit('update', totalChildrenCount) },
      immediate: true,
    },
  },

  methods: {
    isTreeNode(value: any): boolean {
      return (typeof value === "object");
    },

    $_updateChildrenCount(label: string, count: number) {
      this.$set(this.$data.$_childrenCount, label, count);
    },
  }
});
</script>
