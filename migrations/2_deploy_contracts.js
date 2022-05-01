const DCSS = artifacts.require("DCSS");
const Bank = artifacts.require("Bank");
module.exports = function(deployer) {
  deployer.deploy(DCSS);
  deployer.deploy(Bank);
};