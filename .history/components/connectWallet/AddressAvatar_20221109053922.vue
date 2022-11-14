<template>
  <div className="flex h-10 items-center">
    <!-- <Blockies seed="{address.toLowerCase()}" className="mr-2 rounded-md" /> -->
    <span>{{
      address.substring(0, 5) +
      "..." +
      address.substring(this.address.length - 4)
    }}</span>
  </div>
</template>

<script>
export default {
  name: "AddressAvatar",
  // props: ["address"],
  data() {
    return {};
  },
  computed: {
    address() {
      return this.$store.state.address;
    },
  },
};
</script>

<style></style>
