<template>
  <form @submit="addProduct">
    <input v-model="name" placeholder="Name" class="rounded-sm" />
    <input v-model="description" placeholder="Description" />
    <input v-model="price" placeholder="Price" />
    <input type="file" @change="previewFiles" />
    <button class="ml-2 bg-blue-400 rounded-md text-white" type="submit">
      Create NFT
    </button>
  </form>
</template>

<script>
// import { NFTStorage } from 'nft.storage';
// const apiKey =
// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGE0RGQzMUIxN0Y5NzRGQmJmMTFCZEM4MDJlYTNmMGFEQTE3NGZhMkYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NzcyODk0MjM3OCwibmFtZSI6IktpZW4ifQ.bmDOvDs9xaAMMHcC7JEfIaLzQbr6aEZmcfu2PrCvFQk';
// const client = new NFTStorage({ token: apiKey });
// import { ethers } from "ethers";
// import UploadClient from '@uploadcare/upload-client';
// const client = new UploadClient({ publicKey: '068e75bf4a72917a9588' });
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
      // console.log(event.target.files[0]);
      this.file = event.target.files[0];
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
        // const metadata = await client.store({
        // 	name: this.name,
        // 	description: this.description,
        // 	price: this.price,
        // 	image: this.file,
        // });
        const data = new FormData();
        data.append("file", this.file);
        data.append("upload_preset", "ml_default");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dhshj8hi5/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        const file = await res.json();
        console.log(file.secure_url);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
