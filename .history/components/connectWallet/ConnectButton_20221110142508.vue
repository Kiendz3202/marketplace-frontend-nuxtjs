<template>
  <button
    v-if="!address"
    class="flex h-10 w-36 items-center justify-center rounded-full bg-black px-4 font-semibold text-white"
    @click="connectWallet"
    :disabled="loading"
  >
    {{ loading ? "busy..." : "Connect wallet" }}
  </button>
  <AddressAvatar v-else :address="address" />
</template>

<script>
// import { mapState } from 'vuex';
import { ethers } from "ethers";
import AddressAvatar from "./AddressAvatar.vue";
export default {
  name: "ConnectButton",
  components: {
    AddressAvatar,
  },
  computed: {
    address() {
      return this.$store.state.address;
    },
  },
  data() {
    return {
      loading: false,
      // address: "",
      // address: sessionStorage.getItem('user'),
    };
  },
  methods: {
    async connectWallet() {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      sessionStorage.setItem("user", accounts[0]);
      this.$store.dispatch("changeAccount", accounts[0]);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Set signer
      const signer = provider.getSigner();
      // sessionStorage.setItem("signer", signer);
      this.$store.dispatch("changeSigner", signer);
      console.log(provider);
    },
    async changeAccount() {
      this.connectWallet();

      // const accounts = await window.ethereum.request({
      //   method: "eth_requestAccounts",
      // });
      // if (accounts[0]) {
      //   console.log("change disconnect if");
      //   sessionStorage.setItem("user", accounts[0]);
      //   this.$store.dispatch("changeAccount", accounts[0]);
      //   //đã update address mới khi thay đổi account nhưng UI ko thay đổi?
      // } else {
      //   console.log("change disconnect else");
      //   sessionStorage.removeItem("user");
      //   this.$store.dispatch("changeAccount", "");
      // }
      // // location.reload();
    },
  },
  mounted() {
    //bắt event khi thay đổi account trên metamask
    window.ethereum.on("accountsChanged", this.changeAccount);
    // window.ethereum.on("disconnect", async function () {
    //   const accounts = await window.ethereum.request({
    //     method: "eth_requestAccounts",
    //   });
    //   if (accounts[0]) {
    //     console.log("disconnect if");
    //     sessionStorage.setItem("user", accounts[0]);
    //     this.$store.dispatch("changeAccount", accounts[0]);
    //   } else {
    //     console.log("disconnect else");
    //     sessionStorage.removeItem("user");
    //     this.$store.dispatch("changeAccount", "");
    //   }
    // });
  },
};
</script>

<style></style>
