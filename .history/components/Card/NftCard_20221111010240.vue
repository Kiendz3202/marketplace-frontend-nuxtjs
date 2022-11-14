<template>
  <div
    class="flex w-72 flex-shrink-0 flex-col overflow-hidden rounded-xl border font-semibold shadow-sm"
  >
    <img
      v-if="meta"
      src="https://static.wixstatic.com/media/9d8ed5_06bc8fa9e7c349c3bd0f5e954cf3ad5a~mv2.jpg/v1/fit/w_600,h_600,al_c,q_20,enc_auto/file.jpg"
      alt=""
      class="h-80 w-full object-cover object-center"
    />
    <div v-else class="flex h-80 w-full items-center justify-center">
      loading...
    </div>

    <div class="flex flex-col p-4">
      <p class="text-lg">{{ nftInfo.name }}</p>
      <span class="text-sm font-normal">{{ nftInfo.description }}</span>
      <AddressAvatar :address="nftInfo.seller" />
    </div>
    <button
      class="group flex h-16 items-center justify-center bg-black text-lg font-semibold text-white"
      @click="onButtonClick"
      :disabled="loading"
    >
      <span v-if="loading">Busy...</span>

      <span v-else>
        <!-- {!forSale && "SELL"} {forSale && owned && ( -->
        <span v-if="!displayBuying">
          <span class="group-hover:hidden">{{ `${nftInfo.price} WANA` }}</span>
          <!-- cancel -->
          <span class="hidden group-hover:inline">BUY</span>
        </span>
        <span v-else>
          <span class="">{{
            `Bought ${nftInfo.price} WANA FOR THIS NFT`
          }}</span>
        </span>
        <!-- )} {forSale && !owned && (
				<span>
					<span class="group-hover:hidden">10 ETH</span>
					<span class="hidden group-hover:inline">BUY</span>
				</span>
				)} -->
      </span>
    </button>
    <!-- <SellPopup open={sellPopupOpen} onClose={() => setSellPopupOpen(false)}
		@Submit="onSellConfirmed" /> -->
  </div>
</template>

<script>
import AddressAvatar from "../connectWallet/AddressAvatar.vue";
export default {
  name: "NftCard",
  props: ["nftInfo", "displayBuying"],
  components: {
    AddressAvatar,
  },
  data() {
    return {
      meta: true,
      address: "0x707853aF33De5d3E95d6580918e180A59261B75e",
      loading: false,
      owned: true,
      forSale: true,
    };
  },
  methods: {
    onButtonClick() {},
  },
};
</script>

<style></style>
