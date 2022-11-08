<template>
  <div v-if="address" class="flex flex-wrap">
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
  computed: {
    address() {
      return this.$store.state.address;
    },
  },
  components: {
    NftCard,
  },
};
</script>

<style></style>
