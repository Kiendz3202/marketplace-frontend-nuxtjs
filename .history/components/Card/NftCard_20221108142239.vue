<template>
  <div>nft card</div>
</template>

<script>
import AddressAvatar from "../connectWallet/AddressAvatar.vue";
export default {
  name: "NftCard",
  components: {
    AddressAvatar,
  },
  data() {
    return {
      meta: true,
      address: "0x89274596745",
      loading: false,
      owned: true,
      forSale: true,
    };
  },
  methods: {
    onButtonClick() {},
  },
};
</script>

<style></style>
