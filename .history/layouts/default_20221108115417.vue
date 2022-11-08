<template>
  <div>
    <div class="relative flex h-full w-full flex-col pt-20">
      <!-- <TopBar /> -->
      <NavBar />
      <div class="flex h-full w-full overflow-y-auto overflow-x-hidden px-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
// import TopBar from "~/components/topBar/TopBar.vue";
export default {
  name: "default",
  components: {
    //   TopBar,
    NavBar,
  },
};
</script>

<style></style>
