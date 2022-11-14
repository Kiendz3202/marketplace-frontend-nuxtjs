<template>
  <div className="flex h-10 items-center">
    <!-- <Blockies seed="{address.toLowerCase()}" className="mr-2 rounded-md" /> -->
    <span>{{ this.$store.state.address }}</span>
  </div>
</template>

<script>
export default {
  name: "AddressAvatar",
  props: ["address"],
  data() {
    return {
      // addressModify: this.address,
      addressModify: this.address,
    };
  },
  mounted() {
    const start = this.addressModify.substring(0, 5);
    const end = this.addressModify.substring(this.address.length - 4);
    this.addressModify = `${start}...${end}`;
  },
};
</script>

<style></style>
