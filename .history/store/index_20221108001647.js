export const state = () => ({
  tasks: [],
  address: "",
});

export const mutations = {
  ADD_TASK(state, task) {
    state.tasks = [{ content: task, done: false }, ...state.tasks];
  },
  REMOVE_TASK(state, task) {
    state.tasks.splice(state.tasks.indexOf(task), 1);
  },
  TOGGLE_TASK(state, task) {
    task.done = !task.done;
  },
  setAccount(state, address) {
    state.address = address;
  },
};

export const actions = {
  changeToAddress1({ state, commit }, address) {
    commit("setAccount", address);
  },
  changeToAddress2({ state, commit }, address) {
    commit("setAccount", address);
  },
};
