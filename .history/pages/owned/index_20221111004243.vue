<template>
  <div class="flex flex-wrap">
    <NftCard
      v-for="(nft, index) in listedNFTs"
      :key="index"
      :nftInfo="nft"
    ></NftCard>
  </div>
</template>

<script>
import NftCard from "~/components/Card/NftCard.vue";
export default {
  data() {
    return {
      listedNFTs: [],
    };
  },
  components: {
    NftCard,
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
    }
  },
  async fetch() {
    const res = await fetch("http://localhost:5000/allitems");
    const result = res.json();
    this.listedNFTs = result.filter((item) => {
      return item.seller === this.$store.state.address;
    });
  },
};
</script>

<style></style>
