require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [
        `0x3131bdca747ec9ee8b0c3a9eeadb2306988ce97f32692f71d043b51aaeb96939`
      ]
    }
  }
};
