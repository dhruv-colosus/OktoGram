import { AxiosError } from "axios";
import { instance } from "./instance";

const makeApiCall =
  <T, U, V>({
    method,
    url,
  }: {
    method: string;
    url: string;
  }): (({ data, params }: { data: T; params: U }) => Promise<V>) =>
  async ({ data, params }) => {
    let res;
    try {
      res = await instance.request({ method, url, data, params });
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data);
      }
      throw new Error("ok");
    }
    if (res.data.status !== "success") {
      throw new Error("request did not succeed");
    }

    return res.data.data;
  };

export const getUser = makeApiCall<
  {},
  { user_id: string },
  {
    wallets: [
      {
        network_name: string;
        address: string;
        network_id: string;
        network_symbol: string;
      }
    ];
  }
>({
  method: "GET",
  url: "/s2s/api/v1/wallet",
});

export const getSupportedTokens = makeApiCall<
  {},
  {
    page: number;
    size: number;
    user_id: string;
  },
  {
    tokens: [
      {
        token_name: string;
        token_address: string;
        network_name: string;
      }
    ];
  }
>({
  method: "GET",
  url: "/s2s/api/v1/supported/tokens",
});
