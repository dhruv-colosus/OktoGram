import { instance } from "./instance";

type GetSupportedTokensInput = {
  page: number;
  size: number;
  user_id: string;
};

type GetSupportedTokensOutput = [
  {
    token_name: string;
    token_address: string;
    network_name: string;
  }
];

export const getSupportedTokens = async (
  input: GetSupportedTokensInput
): Promise<GetSupportedTokensOutput> => {
  const res = await instance.get("/s2s/api/v1/supported/tokens", {
    params: input,
  });

  if (res.data.status !== "success") {
    throw new Error("request did not succeed");
  }

  return res.data.data.tokens;
};

type MintNftV2Input = {
  
}

export const mintNftV2 = async (
  input: GetSupportedTokensInput
): Promise<GetSupportedTokensOutput> => {
  const res = await instance.post("/s2s/api/v1/supported/tokens", {
    params: input,
  });

  if (res.data.status !== "success") {
    throw new Error("request did not succeed");
  }

  return res.data.data.tokens;
};

