<template>
  <div>index page</div>
</template>

<script>
import NftCard from "~/components/Card/NftCard.vue";
export default {
  name: "IndexPage",
  data() {
    return {};
  },
  components: {
    NftCard,
  },
  methods: {},
  middleware: [
    function ({ redirect }) {
      redirect("/home");
    },
  ],
};
</script>

<style></style>
