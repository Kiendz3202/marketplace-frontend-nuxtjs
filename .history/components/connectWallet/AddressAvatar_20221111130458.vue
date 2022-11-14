<template>
  <div className="flex h-10 items-center">
    <!-- <Blockies seed="{address.toLowerCase()}" className="mr-2 rounded-md" /> -->
    <span>Seller: {{ addressModify }}</span>
  </div>
</template>

<script>
export default {
  name: "AddressAvatar",
  props: ["address"],
  data() {
    return {};
  },
  computed: {
    addressModify() {
      // return this.$store.state.address;
      return (
        this.address.substring(0, 5) +
        "..." +
        this.address.substring(this.address.length - 4)
      );
    },
  },
};
</script>

<style></style>
