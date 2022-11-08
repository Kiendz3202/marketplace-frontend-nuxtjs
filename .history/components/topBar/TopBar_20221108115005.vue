<template>
  <div class="fixed top-0 w-full">
    <div class="relative flex w-full items-center px-4 py-4 shadow">
      <nuxt-link to="/">
        <span class="text-lg font-bold">Marketplace</span>
      </nuxt-link>
      <div class="flex-grow">
        <NavBar />
      </div>
      <!-- <ConnectButton v-if="isMetamaskSupport" />
      <span v-else>Please install metamask</span> -->
    </div>
  </div>
</template>

<script>
// import NavBar from "./NavBar.vue";
// import ConnectButton from "../connectWallet/ConnectButton.vue";
export default {
  name: "TopBar",
  //   comments: {
  //     NavBar,
  //   },
  data() {
    return {
      isMetamaskSupport: false,
    };
  },
  mounted() {
    this.isMetamaskSupport = window.ethereum !== "undefined";
  },
};
</script>

<style></style>
