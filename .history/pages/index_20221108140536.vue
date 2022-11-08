<template>
  <div>
    <h1 class="text-white z-10">index page</h1>
    <NftCard />
  </div>
</template>

<script>
import NftCard from "~/components/Card/NftCard.vue";
export default {
  name: "IndexPage",
  components: {
    NftCard,
  },
};
</script>

<style></style>
