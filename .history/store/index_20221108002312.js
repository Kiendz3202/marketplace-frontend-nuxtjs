export const state = () => ({
  address: "",
  number: "2",
});
export const mutations = {
  setAccount(state, address) {
    state.address = address;
  },
};

export const actions = {
  changeAccount({ state, commit }, address) {
    commit("setAccount", address);
  },
};
