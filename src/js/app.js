App = {
  web3Provider: null,
  contracts: {},
  networkId: null,

  init: function () {
    return App.initWeb3();
  },

  // Instance Web3
  initWeb3: function () {
    // Is there an injected web3 instance?
    if (typeof web3 !== "undefined") {
      App.web3Provider = web3.currentProvider;
      App.networkId = ethereum.networkVersion;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      // Only useful in a development environment
      App.networkId = 5777;
      App.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  // Instance contract
  initContract: function () {
    $.getJSON("TMS.json", function (data) {
      let abi = data.abi;
      let contractAddress = data.networks[App.networkId].address;
      let instance = new web3.eth.Contract(abi, contractAddress);
      App.contracts.Voting = { abi, contractAddress, instance };
      App.getAllProposals();
    });
    return App.bindEvents();
  },



  
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
