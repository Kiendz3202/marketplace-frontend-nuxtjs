<template>
  <nav
    class="absolute bottom-1/2 right-1/2 flex translate-y-1/2 translate-x-1/2 transform justify-center"
  >
    <NavBarItem namePage="home" />
    <NavBarItem namePage="owned" />
    <NavBarItem namePage="create" />
  </nav>
</template>

<script>
import NavBarItem from "~/components/topBar/NavBarItem.vue";

export default {
  name: "NavBar",
  components: {
    NavBarItem,
  },
};
</script>

<style></style>
