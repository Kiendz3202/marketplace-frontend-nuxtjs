<template>
  <div className="flex h-10 items-center">
    <!-- <Blockies seed="{address.toLowerCase()}" className="mr-2 rounded-md" /> -->
    <span>{{ address }}</span>
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
    address1() {
      // return this.$store.state.address;
      return this.address;
    },
  },
};
</script>

<style></style>
