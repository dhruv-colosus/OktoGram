import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const OktogramModule = buildModule("Oktogram", (m) => {

  const oktogram = m.contract("Oktogram", [], {});

  return { oktogram };
});

export default OktogramModule;
