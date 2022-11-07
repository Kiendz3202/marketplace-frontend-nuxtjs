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
// import AddressAvatar from "./AddressAvatar.vue";
export default {
  name: "ConnectButton",
  // components: {
  //   AddressAvatar,
  // },
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

      //0x707853aF33De5d3E95d6580918e180A59261B75e
    };
  },
  methods: {
    async connectWallet() {
      // console.log(this.$store.state.address);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      sessionStorage.setItem("user", accounts[0]);
      this.$store.commit("setAccount", sessionStorage.getItem("user"));
      // this.address = accounts[0];
      // this.$store.dispatch('changeAccount', accounts[0]);
      // sessionStorage.setItem('user', accounts[0]);
    },
    changeAccount(address) {
      this.$store.commit("setAccount", address);
    },
  },
  created() {
    window.ethereum.on("accountsChanged", async function () {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts[0]) {
        sessionStorage.setItem("user", accounts[0]);
        // location.reload();
        await this.changeAccount(accounts[0]);
        // this.$store.commit("setAccount", accounts[0]);
        // console.log(this.$store.state.address);
      } else {
        // sessionStorage.removeItem('user');
        // this.$store.commit('setAccount', '');
      }
      // location.reload();
      console.log(accounts[0]);
      // this.address = accounts[0];
      // console.log(accountss[0]);
    });
    // window.ethereum.on('disconnect', async function () {
    // const accounts = await window.ethereum.request({
    // 	method: 'eth_requestAccounts',
    // });
    // if (accounts[0]) {
    // 	localStorage.setItem('user', accounts[0]);
    // } else {
    // 	localStorage.removeItem('user');
    // }
    // localStorage.removeItem('user');
    // location.reload();
    // console.log('disconnect');
    // this.address = accounts[0];
    // console.log(accountss[0]);
    // });
  },
};
</script>

<style></style>
