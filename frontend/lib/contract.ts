import axios from "axios";
import { headers } from "next/headers";
import { useAuthStore } from "@/store";
import abi from "@/assets/Oktogram.json";
import nftAbi from "@/assets/OktogramNFT.json";
import { Web3 } from "web3";
import { toast } from "sonner";

const MAX_TRIES = 40;
const TRIES_INTERVAL = 3000;

const web3 = new Web3("https://rpc-amoy.polygon.technology/");
const contract = new web3.eth.Contract(
  abi.abi,
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
);
const nftContract = new web3.eth.Contract(
  abi.abi,
  process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS
);

const instance = axios.create({
  baseURL: process.env.API_BASE_URL || "https://sandbox-api.okto.tech",
  headers: {
    "x-api-key": process.env.OKTO_SERVER_API_KEY,
  },
});

const tle_cache = <Args extends unknown[], ReturnType>(
  func: (...args: Args) => ReturnType,
  cache_ms: number
) => {
  let lastRefreshed = 0;
  let cachedVal: ReturnType;

  return (...args: Args) => {
    if (Date.now() - lastRefreshed > cache_ms) {
      lastRefreshed = Date.now();
      cachedVal = func(...args);
    }
    return cachedVal;
  };
};

export const getBlockNumber = tle_cache(async () => {
  return web3.eth.getBlockNumber();
}, 30 * 1000);

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const callFunction = async (c: any, func: string, value: string, args: any) => {
  const from = getTestnetAddress();
  if (!from) throw new Error("wallet not found");

  const encodedData = c.methods[func](...args).encodeABI();

  const res = await instance.post(
    "/api/v1/rawtransaction/execute",
    {
      network_name: "POLYGON_TESTNET_AMOY",
      transaction: {
        from,
        to: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        data: encodedData,
        value,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().authToken}`,
      },
    }
  );

  if (res.data.status !== "success") {
    console.log(res.data);
    throw new Error("func call failed");
  }

  const jobId = res.data.data.jobId as string;
  console.log("got job id", jobId);

  toast.success(
    "The transaction has been published to the blockchain. It will be reflected in a while"
  );

  return new Promise<void>(async (resolve, reject) => {
    let remainingTries = MAX_TRIES;
    while (remainingTries--) {
      const res = await instance.get("/api/v1/rawtransaction/status", {
        params: { order_id: jobId },
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().authToken}`,
        },
      });

      if (res.data.status !== "success") {
        console.log(res.data);
        reject("Status was not successful");
      }

      const job = res.data.data.jobs.find((job: any) => job.order_id === jobId);

      if (!job) {
        reject("Job not found");
      }

      console.log(job);
      if (job.status === "SUCCESS") {
        toast.success("The transaction was successful");
      }

      await sleep(TRIES_INTERVAL);
    }

    reject();
  });
};

const getTestnetAddress = () => {
  return useAuthStore
    .getState()
    .user?.wallets.find((w) => w.network_name === "POLYGON_TESTNET_AMOY")
    ?.address;
};

export const getPosts = async () => {
  const res = await contract.methods.getAllPosts().call();
  return res;
};

export const getStories = async () => {
  const res = await contract.methods.getAllStories().call();
  return res;
};

export const createPost = async (content: string, imageId: string) => {
  await callFunction(contract, "createPost", "0x0", [
    useAuthStore.getState().user?.email || "user",
    imageId,
    content,
  ]);
};

export const createGiveaway = async (
  content: string,
  imageId: string,
  targetLikes: number
) => {
  await callFunction(contract, "createGiveaway", "0x0", [
    useAuthStore.getState().user?.email || "user",
    imageId,
    content,
    process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
    imageId,
    targetLikes,
  ]);
};

export const createStory = async (imageId: string) => {
  await callFunction(contract, "createStory", "0x0", [
    useAuthStore.getState().user?.email || "user",
    imageId,
  ]);
};

export const toggleLike = async (postId: number) => {
  await callFunction(contract, "toggleLike", "0x0", [postId]);
};
