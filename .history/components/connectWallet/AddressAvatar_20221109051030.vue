<template>
  <div className="flex h-10 items-center">
    <!-- <Blockies seed="{address.toLowerCase()}" className="mr-2 rounded-md" /> -->
    <span>{{ this.$store.state.address }}</span>
  </div>
</template>

<script>
export default {
  name: "AddressAvatar",
  // props: ["address"],
  data() {
    return {
      // addressModify: this.address,
      // addressModify: this.address,
    };
  },
  // computed: {
  //   address() {
  //     const start = this.$store.state.address.substring(0, 5);
  //     const end = this.$store.state.address.substring(this.address.length - 4);
  //     return `${start}...${end}`;
  //   },
  // },
  // mounted() {
  //   const start = this.addressModify.substring(0, 5);
  //   const end = this.addressModify.substring(this.address.length - 4);
  //   this.addressModify = `${start}...${end}`;
  // },
};
</script>

<style></style>
