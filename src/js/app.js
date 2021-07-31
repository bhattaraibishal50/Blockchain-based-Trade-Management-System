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
      App.web3Provider = new Web3.providers.HttpProvider("localhost:7545");
    }
    window.web3.currentProvider.enable();
    web3 = new Web3(window.web3.currentProvider);
    return App.initContract();
  },

  // Instance contract
  initContract: function () {
    $.getJSON("TMS.json", function (data) {
      let abi = data.abi;
      let contractAddress = '0x7c9d76B9E8f416847A4baC6691cE867cb71e1e69';
      let instance = new web3.eth.Contract(abi, contractAddress);
      App.contracts.TMS= { abi, contractAddress, instance };
    });
    return App.bindEvents();

  },

  bindEvents: function () {
    $(document).on("click", ".button-buy", async function (e) {
      let $this = $(this);
      await App.buy_Shares(e);


      
    });

    $(document).on("click", ".button-sell", async function (e) {
      var $this = $(this);

      await App.sell_Shares(e);





    });

    $(document).on("click", ".button-watch", async function (e) {
      let $this = $(this);
      await App.Portfolio_value(e);



      
    });

    $(document).on("click", ".button-allocate", async function (e) {
      let $this = $(this);
      await App.IPO(e);



      
    });

  },


  getAccount: async function () {
    let accounts = await web3.eth.getAccounts();
    return accounts[0];

  },

  buy_Shares: async function (event) {
    event.preventDefault();

    let instance = App.contracts.TMS.instance;
    let value = $(".input-value-buy").val();
    let account = await App.getAccount();

    if (value === "") {
      $(".toast").toast("show");
      return;
    }
    // console.log(account);
    //let tx = await instance.methods.buyShares(value).call();
    // let tx = await instance.methods.buyShares(value).call()
    // web3.eth.sendTransaction({
    //   to:'0xf5b733e3E480710F5A05bA82a8aAa974F5fc6D8e', 
    //   from:account, 
    //   value:value})

    // var getData = await instance.methods.buyShares(value);
    var tx = instance.methods.buyShares(value).send({
      to:'0xf5b733e3E480710F5A05bA82a8aAa974F5fc6D8e', 
      from:account, 
      value: value*10});

    // if (tx.status) {
    //   $(".input-value-buy").val("");
    //   }


  },

  sell_Shares: async function (event) {
    event.preventDefault();

    let instance = App.contracts.TMS.instance;
    let value = $(".input-value-sell").val();
    let account = await App.getAccount();
    if (value === "") {
      $(".toast").toast("show");
      return;
      }
    console.log("sell");

    // let tx = await instance.methods.sellShares(value).send({ from: account });
    // if (tx.status) {
    //     // App.getAllProposals();
    //   $(".input-value-sell").val("");
    //   }
    var tx = instance.methods.sellShares(value).send({
      to:account, 
      from:'0xf5b733e3E480710F5A05bA82a8aAa974F5fc6D8e', 
      value: value*10});
    // console.log(tx)
    // let tx = await instance.methods.sellShares(value).call()

  },
  IPO: async function (event) {
    event.preventDefault();
    let instance = App.contracts.TMS.instance;
    let value = $(".input-value-IPO").val();

    let tx = await instance.methods.Allocate().call();





  },

  Portfolio_value: async function (event) {
    event.preventDefault();
    let instance = App.contracts.TMS.instance;
    let value = $(".input-value-portfolio").val();


    // console.log(await instance.methods.PortfolioValue(value).call());

    $(".Portfoliovalue").text(await instance.methods.PortfolioValue(value).call());

  }









  
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
