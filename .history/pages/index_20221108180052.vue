<template>
  <div>
    <h1 class="text-white z-10">index page</h1>
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
      function timeout(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
    },
  },
};
</script>

<style></style>
