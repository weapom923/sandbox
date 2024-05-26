<template>
  <v-row>
    <v-col cols="12">
      <v-btn v-on:click="$nextTick($forceUpdate)">Force Rerender</v-btn>
    </v-col>

    <v-col cols="6" class="d-flex flex-column">
      <v-btn
        color="primary"
        v-on:click="$emit('update:val-reactive1', valReactive1 + 1)"
      >
        update({{ valReactive1 }})
      </v-btn>
      <v-subheader>update:[prop名] イベント</v-subheader>
    </v-col>

    <v-col cols="6" class="d-flex flex-column">
      <v-btn
        v-on:click="valMissing1 = valMissing1 + 1"
      >
        update({{ valMissing1 }})
      </v-btn>
      <v-subheader>prop に新しい値を代入</v-subheader>
    </v-col>

    <v-col cols="4" class="d-flex flex-column">
      <v-btn
        color="primary"
        v-on:click="$emit('update:arr-reactive1', [ ...arrReactive1, 1 ])"
      >
        update({{ arrReactive1 }})
      </v-btn>
      <v-subheader>update:[prop名] イベント</v-subheader>
    </v-col>

    <v-col cols="4" class="d-flex flex-column">
      <v-btn
        color="primary"
        v-on:click="arrReactive2.push(1)"
      >
        update({{ arrReactive2 }})
      </v-btn>
      <v-subheader>prop の push メソッド</v-subheader>
    </v-col>

    <v-col cols="4" class="d-flex flex-column">
      <v-btn
        v-on:click="arrMissing1 = [ ...arrMissing1, 1 ]"
      >
        update({{ arrMissing1 }})
      </v-btn>
      <v-subheader>prop に新しい値を代入</v-subheader>
    </v-col>

    <v-col cols="3" class="d-flex flex-column">
      <v-btn
        color="primary"
        v-on:click="$emit('update:obj-reactive1', { ...objReactive1, a: 1 })"
      >
        update({{ objReactive1 }})
      </v-btn>
      <v-subheader>update:[prop名] イベント</v-subheader>
    </v-col>

    <v-col cols="3" class="d-flex flex-column">
      <v-btn
        color="primary"
        v-on:click="$set(objReactive2, 'a', 1)"
      >
        update({{ objReactive2 }})
      </v-btn>
      <v-subheader>$set</v-subheader>
    </v-col>

    <v-col cols="3" class="d-flex flex-column">
      <v-btn
        v-on:click="objNonreactive1['a'] = 1"
      >
        update({{ objNonreactive1 }})
      </v-btn>
      <v-subheader>prop のプロパティアクセサによる代入</v-subheader>
    </v-col>

    <v-col cols="3" class="d-flex flex-column">
      <v-btn
        v-on:click="objMissing1 = { ...objMissing1, a: 1 }"
      >
        update({{ objMissing1 }})
      </v-btn>
      <v-subheader>prop に新しい値を代入</v-subheader>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    valReactive1:    { type: Number, required: true },
    valMissing1:     { type: Number, required: true },
    arrReactive1:    { type: Array as PropType<number[]>, required: true },
    arrReactive2:    { type: Array as PropType<number[]>, required: true },
    arrMissing1:     { type: Array as PropType<number[]>, required: true },
    objReactive1:    { type: Object as PropType<Record<string, number>>, required: true },
    objReactive2:    { type: Object as PropType<Record<string, number>>, required: true },
    objNonreactive1: { type: Object as PropType<Record<string, number>>, required: true },
    objMissing1:     { type: Object as PropType<Record<string, number>>, required: true },
  },
});
</script>