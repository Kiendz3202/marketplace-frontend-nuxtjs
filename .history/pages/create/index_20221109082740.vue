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
// import { ethers } from "ethers";
export default {
  data() {
    return {
      name: "",
      description: "",
      price: "",
      file: "",
    };
  },
  props: ["marketplace", "nft"],
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
      try {
        const metadata = await client.store({
          name: this.name,
          description: this.description,
          price: this.price,
          image: this.file,
        });

        const uri = `https://cloudflare-ipfs.com/ipfs/${metadata.ipnft}/metadata.json`;

        // const res = await fetch(uri);
        // const result = await res.json();
        // console.log(result);
        // console.log(
        //   `https://cloudflare-ipfs.com/ipfs/${result.image.slice(7)}`
        // );
        const response = await fetch('http://localhost:5000/mintnft', {
          method: 'POST',
          body: JSON.stringify(uri),
          headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded'    },
        })
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
