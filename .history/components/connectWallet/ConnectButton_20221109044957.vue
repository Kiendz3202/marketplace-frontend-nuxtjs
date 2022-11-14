<template>
  <div>
    <button
      v-if="!address"
      class="flex h-10 w-36 items-center justify-center rounded-full bg-black px-4 font-semibold text-white"
      @click="connectWallet"
      :disabled="loading"
    >
      {{ loading ? "busy..." : "Connect wallet" }}
    </button>
    <AddressAvatar v-else :address="address" />
    <button @click="toggle1">toggle to address 1</button>
    <button @click="toggle2">toggle to address 2</button>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
import AddressAvatar from "./AddressAvatar.vue";
export default {
  name: "ConnectButton",
  components: {
    AddressAvatar,
  },
  // computed: {
  //   address() {
  //     return this.$store.state.address;
  //   },
  // },
  data() {
    return {
      loading: false,
      address: this.$store.state.address,
      // address: sessionStorage.getItem('user'),
    };
  },
  methods: {
    toggle1() {
      this.$store.commit("setAccount", "adress 1111111111111");
    },
    toggle2() {
      console.log(this.$store.state.address);
      this.$store.commit("setAccount", "adress 2222222222222");
    },
    async connectWallet() {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      sessionStorage.setItem("user", accounts[0]);
      this.$store.dispatch("changeAccount", sessionStorage.getItem("user"));
    },
    async changeAccount() {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts[0]) {
        this.address = accounts[0];
        console.log(this.$store.state.address);
        sessionStorage.setItem("user", accounts[0]);
        this.$store.dispatch("changeAccount", sessionStorage.getItem("user"));
        this.address = accounts[0];
        console.log(this.$store.state.address);
        //đã update address mới khi thay đổi account nhưng UI ko thay đổi?
      } else {
        // sessionStorage.removeItem('user');
        // this.$store.commit('setAccount', '');
      }
      // location.reload();
      // console.log(accounts[0]);
    },
  },
  created() {
    //bắt event khi thay đổi account trên metamask
    window.ethereum.on("accountsChanged", this.changeAccount);
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
