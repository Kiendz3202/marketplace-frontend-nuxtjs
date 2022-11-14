<template>
  <div
    class="flex w-72 flex-shrink-0 flex-col overflow-hidden rounded-xl border font-semibold shadow-sm"
  >
    <img
      v-if="nftInfo"
      :src="nftInfo.image"
      alt=""
      class="h-80 w-full object-cover object-center"
    />
    <div v-else class="flex h-80 w-full items-center justify-center">
      loading...
    </div>

    <div class="flex flex-col p-4">
      <p class="text-lg">{{ nftInfo.name }}</p>
      <span class="text-sm font-normal">{{ nftInfo.description }}</span>
      <!-- <AddressAvatar :address="nftInfo.seller" /> -->
      <p class="text-base">
        Seller:
        {{
          `${nftInfo.seller.substring(0, 5)}...${nftInfo.seller.substring(
            nftInfo.seller.length - 4
          )}`
        }}
      </p>
    </div>
    <button
      class="group flex h-16 items-center justify-center bg-black text-lg font-semibold text-white"
      @click="onButtonClick"
      :disabled="loading || nftInfo.sold || owned"
    >
      <span v-if="loading">Busy...</span>

      <span v-else>
        <span v-if="!nftInfo.sold">
          <span class="group-hover:hidden">{{ `${nftInfo.price} WANA` }}</span>
          <span class="hidden group-hover:inline">BUY</span>
        </span>
        <span v-else>
          <span>{{ `${nftInfo.price} WANA` }}</span>
        </span>
      </span>
    </button>
  </div>
</template>

<script>
import AddressAvatar from "../connectWallet/AddressAvatar.vue";
import { ethers } from "ethers";
const marketplaceABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nft",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
    ],
    name: "Bought",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nft",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
    ],
    name: "Offered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "_listings",
    outputs: [
      { internalType: "uint256", name: "itemId", type: "uint256" },
      {
        internalType: "contract IERC721",
        name: "nft",
        type: "address",
      },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "price", type: "uint256" },
      { internalType: "address", name: "seller", type: "address" },
      { internalType: "bool", name: "sold", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_tokenID", type: "uint256" }],
    name: "buyNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "itemCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC721",
        name: "_nft",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenID",
        type: "uint256",
      },
      { internalType: "uint256", name: "_price", type: "uint256" },
    ],
    name: "listNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "wanakaToken",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const nftABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_tokenURI", type: "string" }],
    name: "mint",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export default {
  name: "NftCard",
  props: ["nftInfo"],
  components: {
    AddressAvatar,
  },
  data() {
    return {
      loading: false,
      owned: false,
      forSale: true,
    };
  },
  computed: {
    owned() {
      return (
        nftInfo.seller.toLowerCase() === this.$store.state.address.toLowerCase()
      );
    },
  },
  methods: {
    async onButtonClick() {
      this.loading = true;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      //contract
      const marketplace = new ethers.Contract(
        "0x52e58FE7254FD0964F309239ad5F753b63246518",
        marketplaceABI,
        signer
      );
      const nft = new ethers.Contract(
        "0xb60461d9A4a71bfCB3A24F0fFbfCb157B3A5cb9b",
        nftABI,
        signer
      );
      try {
        await (await marketplace.buyNFT(this.nftInfo.itemId)).wait();

        const res = await fetch("http://localhost:5000/updatepurchase", {
          method: "POST",
          body: JSON.stringify({
            itemId: this.nftInfo.itemId,
            sold: true,
            buyer: this.$store.state.address,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
        console.log("call api");

        this.loading = false;
        location.reload();
      } catch (error) {
        if (error.code === "ACTION_REJECTED") {
          console.log(error.code);
        }
        this.loading = false;
      }
    },
  },
};
</script>

<style></style>
