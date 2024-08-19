import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    polygonAmoy: {
      url: "https://rpc-amoy.polygon.technology/",
      accounts: [process.env.WALLET_PRIVATE_KEY!],
    },
  },
};

export default config;
