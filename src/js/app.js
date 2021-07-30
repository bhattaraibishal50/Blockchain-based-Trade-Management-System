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
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  // Instance contract
  initContract: function () {
    $.getJSON("TMS.json", function (data) {
      let abi = data.abi;
      let contractAddress = '0x4B3CAa758Ba86745812AfEedfDc519Afd64C3D92';
      let instance = new web3.eth.Contract(abi, contractAddress);
      App.contracts.Voting = { abi, contractAddress, instance };
    });
    return App.bindEvents();

  },

  bindEvents: function () {
    $(document).on("click", ".button-buy", async function (e) {
      let $this = $(this);

      try {
        await App.buy_shares(e);
      } catch (e) {

      }
      
    });

    $(document).on("click", ".btn-sell", async function (e) {
      var $this = $(this);
      App.btnLoading($this);
      try {
        await App.sell_shares(e);
      } catch (e) {

      }


    });

    $(document).on("click", ".button-watch", async function (e) {
      let $this = $(this);

      try {
        await App.Portfolio_value(e);
      } catch (e) {

      }
      
    });

    $(document).on("click", ".button-allocate", async function (e) {
      let $this = $(this);

      try {
        await App.allocate(e);
      } catch (e) {

      }
      
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

    try {
      let tx = await instance.methods.buyShares(value).send({ from: account });
      if (tx.status) {
        // App.getAllProposals();
        $(".input-value-buy").val("");
        }
      } catch (e) {
        throw Error(e);
      }

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

    try {
      let tx = await instance.methods.sellShares(value).send({ from: account });
      if (tx.status) {
        // App.getAllProposals();
        $(".input-value-sell").val("");
        }
      } catch (e) {
        throw Error(e);
      }
  },

  Portfolio_value: async function (event) {
    event.preventDefault();
    let instance = App.contracts.TMS.instance;
    let value = $(".input-value-portfolio").val();
    let data = await instance.methods.Portfoliovalue(value).call();
    find(".Portfoliovalue").text(data);

  },

  allocate: async function (event) {
    event.preventDefault();
    let instance = App.contracts.TMS.instance;
    let value = $(".input-value-IPO").val();
    await instance.methods.allocate(value).call();



  },







  
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
