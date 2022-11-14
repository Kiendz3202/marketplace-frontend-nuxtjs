export const state = () => ({
  address: sessionStorage.getItem("user") || "",
  signer: sessionStorage.getItem("user") || "",
});
export const mutations = {
  setAccount(state, address) {
    state.address = address;
  },
  setSigner(state, signer) {
    state.signer = signer;
  },
};

export const actions = {
  changeAccount({ state, commit }, address) {
    commit("setAccount", address);
  },
};
