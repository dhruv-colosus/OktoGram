"use client";

import { OktoContextType, useOkto } from "okto-sdk-react";
import { useEffect } from "react";

function Wallet() {
  const { getWallets } = useOkto() as OktoContextType;

  useEffect(() => {
    console.log("getting wallets");

    getWallets()
      .then((result) => {
        console.log("wallets", result);
      })
      .catch((error) => {
        console.error(`error:`, error);
      });
  }, []);

  return <div>Wallet </div>;
}

export default Wallet;
