<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-simple-table>
          <thead>
            <tr>
              <th>Value</th>
              <th>Array</th>
              <th>Object</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ $data.$_val }}</td>
              <td>{{ $data.$_arr }}</td>
              <td>{{ $data.$_obj }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <options-api
          :arr.sync="$data.$_arr"
          :obj.sync="$data.$_obj"
          :val.sync="$data.$_val"
        >
        </options-api>
      </v-col>
      <v-col cols="6">
        <class-component
          :arr.sync="$data.$_arr"
          :obj.sync="$data.$_obj"
          :val.sync="$data.$_val"
        >
        </class-component>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OptionsApi from "@/pages/DataBinding/OptionsApi.vue";
import ClassComponent from "@/pages/DataBinding/ClassComponent.vue";

export default defineComponent({
  components: {
    OptionsApi,
    ClassComponent,
  },

  data(): {
    $_val: string,
    $_arr: string[],
    $_obj: Record<string, string>,
  } {
    return {
      $_val: "abc",
      $_arr: [ "a", "b", "c" ],
      $_obj: { a: "A", b: "B", c: "C" },
    };
  },
});
</script>