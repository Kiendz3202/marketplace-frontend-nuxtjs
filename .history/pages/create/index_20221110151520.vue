<template>
  <form @submit="addProduct">
    <input
      v-model="name"
      placeholder="Name"
      class="rounded-md pl-3 py-2 text-black outline-none"
    />
    <input
      v-model="description"
      placeholder="Description"
      class="rounded-md pl-3 py-2 text-black outline-none"
    />
    <input
      v-model="price"
      placeholder="Price"
      class="rounded-md pl-3 py-2 text-black outline-none"
    />
    <input type="file" @change="previewFiles" />
    <button class="ml-2 bg-blue-400 rounded-md text-white p-2" type="submit">
      Create NFT
    </button>
  </form>
</template>

<script>
import { NFTStorage } from "nft.storage/dist/bundle.esm.min.js";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGE0RGQzMUIxN0Y5NzRGQmJmMTFCZEM4MDJlYTNmMGFEQTE3NGZhMkYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NzcyODk0MjM3OCwibmFtZSI6IktpZW4ifQ.bmDOvDs9xaAMMHcC7JEfIaLzQbr6aEZmcfu2PrCvFQk";
const client = new NFTStorage({ token: apiKey });
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
  data() {
    return {
      name: "",
      description: "",
      price: "",
      file: "",
    };
  },
  // props: ["marketplace", "nft"],
  methods: {
    previewFiles(event) {
      const file = event.target.files[0];
      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onloadend = () => {
      //   this.file = reader.result;
      // };
      this.file = file;
    },
    async mintThenList(result) {
      console.log(result);
      // const uri = `https://cloudflare-ipfs.com/ipfs/${result.ipnft}/metadata.json`;
      // console.log(uri);
      // mint nft
      // console.log(uri);
      // await (await props.nft.mint(uri)).wait();
      // console.log('completely create minting!');
      // // get tokenId of new nft
      // const id = await props.nft.tokenCount();
      // // approve marketplace to spend nft
      // await (
      // 	await props.nft.setApprovalForAll(
      // 		props.marketplace.address,
      // 		true
      // 	)
      // ).wait();
      // // add nft to marketplace
      // const listingPrice = ethers.utils.parseEther(price.toString());
      // await (
      // 	await props.marketplace.makeItem(
      // 		props.nft.address,
      // 		id,
      // 		listingPrice
      // 	)
      // ).wait();
      // console.log('complete listing');
    },
    async addProduct(e) {
      e.preventDefault(); // Prevent page from reloading.
      // try {
      //   const metadata = await client.store({
      //     name: this.name,
      //     description: this.description,
      //     price: this.price,
      //     image: this.file,
      //   });

      //   const uri = `https://cloudflare-ipfs.com/ipfs/${metadata.ipnft}/metadata.json`;

      //   const res = await fetch(uri);
      //   const metadataResult = await res.json();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const marketplace = new ethers.Contract(
        "0x52e58FE7254FD0964F309239ad5F753b63246518",
        marketplaceABI,
        signer
      );
      console.log(marketplace);
      //   setMarketplace(marketplace);
      //   const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
      //   console.log(nft);

      //   // console.log(result);
      //   // console.log(
      //   //   `https://cloudflare-ipfs.com/ipfs/${result.image.slice(7)}`
      //   // );

      //   // const response = await fetch("http://localhost:5000/mintnft", {
      //   //   method: "POST",
      //   //   body: JSON.stringify({
      //   //     uri: uri,
      //   //     metadata: metadataResult,
      //   //     signer: signer,
      //   //   }),
      //   //   headers: {
      //   //     "Content-Type": "application/json",
      //   //   },
      //   // });
      //   // const result = await response.json();
      //   // console.log(result);
      // } catch (error) {
      //   console.log(error);
      // }
    },
  },
};
</script>

<style></style>
