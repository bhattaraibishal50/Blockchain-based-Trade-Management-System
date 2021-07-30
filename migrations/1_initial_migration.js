const TMS = artifacts.require("TMS");

module.exports = function (deployer) {
  deployer.deploy(TMS,"TMS","TS.com",100000,10);
};