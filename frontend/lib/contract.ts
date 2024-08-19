import axios from "axios";
import { headers } from "next/headers";
import { useAuthStore } from "@/store";
import abi from "@/assets/Oktogram.json";
import { Web3 } from "web3";

const MAX_TRIES = 40;
const TRIES_INTERVAL = 3000;

const web3 = new Web3("https://rpc-amoy.polygon.technology/");
const contract = new web3.eth.Contract(
  abi.abi,
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
);

const instance = axios.create({
  baseURL: process.env.API_BASE_URL || "https://sandbox-api.okto.tech",
  headers: {
    "x-api-key": process.env.OKTO_SERVER_API_KEY,
  },
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const callFunction = async (func: string, value: string, args: any) => {
  const from = getTestnetAddress();
  if (!from) throw new Error("wallet not found");

  const encodedData = contract.methods[func](...args).encodeABI();

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
        throw new Error("job check failed");
      }

      const job = res.data.data.jobs.filter(
        (job: any) => job.order_id === jobId
      );

      console.log(job);
      if (job.status === "PUBLISHED") {
        resolve();
        return;
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
  return res
};

export const createPost = async (content: string, imageUrl: string) => {
  await callFunction("createPost", "0x0", [imageUrl, content]);
};

export const createGiveawayPost = async (
  content: string,
  imageUrl: string,
  targetLikes: string
) => {
  // TODO upload nft
};

export const toggleLike = async (postId: number) => {
  await callFunction("toggleLike", "0x0", [postId]);
};
