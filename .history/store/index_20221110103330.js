export const state = () => ({
  address: sessionStorage.getItem("user") || "",
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
