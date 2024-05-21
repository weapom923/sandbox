<template>
  <div class="d-flex flex-column">
    <v-btn v-on:click="throwError">throw error</v-btn>
    <v-btn v-on:click="throwErrorPromise">throw error in promise</v-btn>
    <v-btn v-on:click="throwErrorThen">then throw error</v-btn>
    <v-btn v-on:click="promiseReject">promise reject</v-btn>
    <div>{{ $data.$_errorMessage }}</div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";

export default defineComponent({
  data(): {
    $_errorMessage?: string,
  } {
    return {
      $_errorMessage: undefined,
    };
  },

  created() {
    window.addEventListener('unhandledrejection', this.onUnhandledRejection);
  },

  beforeDestroy() {
    window.removeEventListener('unhandledrejection', this.onUnhandledRejection);
  },

  errorCaptured(_error: Error, _vm: Vue, info: string) {
    this.errorHandler('errorCaptured', info);
    return false;
  },

  methods: {
    throwError() {
      throw new Error("error in component");
    },

    async throwErrorPromise() {
      return new Promise(() => {
        throw new Error("promise error in component")
      });
    },

    throwErrorThen() {
      Promise.resolve().then(() => { throw new Error("promise error in component") });
    },

    async promiseReject() {
      return Promise.reject("promise reject in component");
    },

    onUnhandledRejection(event: PromiseRejectionEvent) {
      event.preventDefault();
      if (event.reason instanceof Error) {
        this.errorHandler('onUnhandledRejection', event.reason.message);
      } else {
        this.errorHandler('onUnhandledRejection', `${event.reason}`);
      }
    },

    onError(event: ErrorEvent) {
      event.preventDefault();
      this.errorHandler('onError', event.message);
    },

    errorHandler(errorHandler: string, info: string) {
      this.$data.$_errorMessage = `[${errorHandler}]: ${info}`;
    },
  },
});
</script>