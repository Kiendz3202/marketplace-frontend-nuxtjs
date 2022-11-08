<template>
  <div>
    <h1 class="text-white z-10">{{ count }}</h1>
    <button @click="callApi">plus</button>
  </div>
</template>

<script>
import NftCard from "~/components/Card/NftCard.vue";
export default {
  name: "IndexPage",
  data() {
    return {
      count: 0,
    };
  },
  components: {
    NftCard,
  },
  methods: {
    async callApi() {
      function timeoutEx(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      await timeoutEx(5000);
      this.count = this.count++;
    },
  },
};
</script>

<style></style>
