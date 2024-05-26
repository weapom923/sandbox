<template>
  <v-row>
    <v-col cols="6">
      <v-btn v-on:click="$data.$_mount = !$data.$_mount">Mount/Unmount</v-btn>
      <life-cycle-hooks-sub-component
        v-if="$data.$_mount"
        v-on:event="$data.$_logs.push($event)"
      >
      </life-cycle-hooks-sub-component>
    </v-col>

    <v-col cols="6">
      <v-btn v-on:click="$data.$_logs.splice(0)">Clear logs</v-btn>
      <v-simple-table>
        <thead>
          <tr>
            <th>log</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log of $data.$_logs">
            <td>{{ log }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LifeCycleHooksSubComponent from "@/pages/LIfeCycleHooks/LifeCycleHooksSubComponent.vue";
export default defineComponent({
  components: { LifeCycleHooksSubComponent },

  data(): {
    $_mount: boolean,
    $_logs: string[],
  } {
    return {
      $_mount: false,
      $_logs: [],
    };
  },
});
</script>