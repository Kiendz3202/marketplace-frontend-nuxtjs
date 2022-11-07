<template>
  <div>
    <div>{{ address }}</div>
    <button @click="changeToAddress1">change to address 1</button>
    <button @click="changeToAddress2">change to address 2</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: "",
    };
  },
  computed: {
    address() {
      return this.$store.state.address;
    },
  },
  methods: {
    addTask() {
      if (this.newTask) {
        this.$store.commit("ADD_TASK", this.newTask);
        this.newTask = "";
      }
    },
  },
};
</script>
