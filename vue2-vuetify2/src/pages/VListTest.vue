<template>
  <v-row>
    <v-col cols="4">
      <v-card>
        <v-card-title>{{ $data.$_selectedStringItemIdx }}({{ listStringItems[$data.$_selectedStringItemIdx] }})</v-card-title>
        <v-card-subtitle>index を v-model にバインド</v-card-subtitle>
        <v-card-text>
          <v-list>
            <v-list-item-group
              v-model="$data.$_selectedStringItemIdx"
              mandatory
            >
              <v-list-item
                v-for="(item, itemIdx) in listStringItems"
                v-bind:key="itemIdx"
              >
                {{ item }}
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="4">
      <v-card>
        <v-card-title>{{ $data.$_selectedStringItem }}</v-card-title>
        <v-card-subtitle>item を v-model にバインド</v-card-subtitle>
        <v-card-text>
          <v-list>
            <v-list-item-group
              v-model="$data.$_selectedStringItem"
              mandatory
            >
              <v-list-item
                v-for="(item, itemIdx) in listStringItems"
                v-bind:key="itemIdx"
                v-bind:value="item"
              >
                {{ item }}
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="4">
      <v-card>
        <v-card-title>{{ $data.$_selectedItem }}</v-card-title>
        <v-card-subtitle>item を v-model にバインド(等価比較関数)</v-card-subtitle>
        <v-card-text>
          <v-list>
            <v-list-item-group
              v-model="$data.$_selectedItem"
              v-bind:value-comparator="Data.isEqual"
              mandatory
            >
              <v-list-item
                v-for="(item, itemIdx) in listItems"
                v-bind:key="itemIdx"
                v-bind:value="item"
              >
                {{ item }}
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";

class Data {
  constructor(readonly data: string[]) {}
  toString() { return JSON.stringify(this) }
  static isEqual(a?: Data, b?: Data) {
    if (a === b) return true
    if (a === undefined) return false;
    if (b === undefined) return false;
    if (a.data.length !== b.data.length) return false;
    for (let i = 0; i < a.data.length; ++i) {
      if (a.data[i] !== b.data[i]) return false;
    }
    return true;
  }
}

export default defineComponent({
  setup(): {
    listStringItems: string[],
    listItems: Data[],
    Data,
  } {
    return {
      listStringItems: [ 'item1', 'item2', 'item3' ],
      listItems: [
        new Data([ 'item1' ]),
        new Data([ 'item2' ]),
        new Data([ 'item3' ]),
      ],
      Data,
    };
  },

  data(): {
    $_selectedStringItemIdx?: number,
    $_selectedStringItem?: string,
    $_selectedItem?: Data,
  } {
    return {
      $_selectedStringItemIdx: 2,
      $_selectedStringItem: 'item3',
      $_selectedItem: new Data([ 'item3' ]),
    };
  },
});
</script>