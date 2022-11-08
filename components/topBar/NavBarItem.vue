<template>
  <nuxt-link :to="'/' + namePage"
    ><span class="px-4 py-2 font-semibold cursor-pointer">{{
      namePage
    }}</span></nuxt-link
  >
</template>

<script>
export default {
  name: "NavBarItem",
  props: ["namePage"],
};
</script>

<style></style>
