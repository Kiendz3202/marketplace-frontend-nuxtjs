<template>
  <div class="flex flex-wrap">
    <NftCard
      v-for="(nft, index) in listedNFTs"
      :key="index"
      :nftInfo="nft"
      :displayBuying="displayBuying"
    ></NftCard>
  </div>
</template>

<script>
import NftCard from "~/components/Card/NftCard.vue";
export default {
  data() {
    return {
      listedNFTs: [],
      displayBuying: false,
    };
  },
  components: {
    NftCard,
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 5000) {
      this.$fetch();
    }
  },
  async fetch() {
    const res = await fetch("http://localhost:5000/allitems");
    const result = await res.json();
    this.listedNFTs = result.filter((item) => {
      return (
        item.seller.toLocaleLowerCase() ===
        this.$store.state.address.toLocaleLowerCase()
      );
    });
  },
  methods: {
    async changeAccount() {
      const res = await fetch("http://localhost:5000/allitems");
      const result = await res.json();
      this.listedNFTs = result.filter((item) => {
        return (
          item.seller.toLocaleLowerCase() ===
          this.$store.state.address.toLocaleLowerCase()
        );
      });
    },
  },
  async mounted() {
    window.ethereum.on("accountsChanged", this.changeAccount);
  },
};
</script>

<style></style>
