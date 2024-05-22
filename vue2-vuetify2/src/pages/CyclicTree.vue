<template>
  <v-container>
    <cyclic-tree
      v-for="(_data, _label) in data"
      :label="_label"
      :data="_data"
      :key="`${_label}-custom-slot`"
    >
      <template #label="{ label }">{{ idToLabel[label] }}</template>
      <template #count="{ count }">{{ count }}人</template>
    </cyclic-tree>

    <cyclic-tree
      v-for="(_data, _label) in data"
      :label="_label"
      :data="_data"
      :key="_label"
    >
    </cyclic-tree>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CyclicTree, { TreeNode } from "@/components/CyclicTree";

export default defineComponent({
  components: { CyclicTree },

  setup(): {
    idToLabel: Record<string, string>,
    data: TreeNode,
  } {
    return {
      idToLabel: {
        availableAccount: "有効アカウント",
        loggedIn: "ログイン済",
        notLoggedIn: "未ログイン",
        sent: "送付済",
        notSent: "未送付",
        received: "受取済",
        notReceived: "未受取",
      },
      data: {
        availableAccount: {
          loggedIn: {
            sent: {
              received: 227,
              notReceived: 46,
            },
            notSent: {
              received: 0,
              notReceived: 1,
            },
          },
          notLoggedIn: {
            sent: {
              received: 0,
              notReceived: 0,
            },
            notSent: {
              received: 0,
              notReceived: 78,
            },
          },
        },
      }
    }
  },
});
</script>
