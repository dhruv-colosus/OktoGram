import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const OktogramModule = buildModule("OktogramNFT", (m) => {
  const oktogram = m.contract("OktogramNFT", [], {});

  return { oktogram };
});

export default OktogramModule;
