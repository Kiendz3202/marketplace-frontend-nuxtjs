<template>
  <div class="flex">
    <NftCard v-for="nft in listedNFTs" :key="nft"></NftCard>
  </div>
</template>

<script>
import NftCard from "~/components/Card/NftCard.vue";
export default {
  data() {
    return {
      listedNFTs: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  },
  components: {
    NftCard,
  },
};
</script>

<style></style>
