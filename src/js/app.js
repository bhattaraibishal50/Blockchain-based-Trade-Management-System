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
      let contractAddress = '0x0bD11a7b287718674719acf2b7176b8d9C500ee7';
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
      await App.allocate(e);
      App.btnReset($this);



      
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
    //   to:'0xE65cBcFcc2Ee67DcbCca68a48F87854Acd37982A', 
    //   from:account, 
    //   value:value})

    // var getData = await instance.methods.buyShares(value);
    var tx = instance.methods.buyShares(value).send({
      to:'0xE65cBcFcc2Ee67DcbCca68a48F87854Acd37982A', 
      from:account, 
      value: value*10});
    App.makeatable(account,value,"buy");
    if (value>1000) {
      App.makeatable_sus(account,value,"buy");
    }


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
      from:'0xE65cBcFcc2Ee67DcbCca68a48F87854Acd37982A', 
      value: value*10});
    App.makeatable(account,value,"sell");
    if (value>1000) {
      App.makeatable_sus(account,value,"sell");
    }
    // console.log(tx)
    // let tx = await instance.methods.sellShares(value).call()

  },
  allocate: async function (event) {
    event.preventDefault();
    let instance = App.contracts.TMS.instance;

    let account = await App.getAccount();
    let value = $(".input-value-IPO").val();


    var tx = await instance.methods.sharecount(value).send({

      from:account });

    // let tx = await instance.methods.sharecount(10).call();





  },

  Portfolio_value: async function (event) {
    event.preventDefault();
    let instance = App.contracts.TMS.instance;
    let value = $(".input-value-portfolio").val();



    // console.log(await instance.methods.PortfolioValue(value).call());

    $(".Portfoliovalue").text(await instance.methods.PortfolioValue(value).call());

  },

  btnReset: function (elem) {
    $(elem).prop("disabled", false);
    $(elem).html($(elem).attr("data-original-text"));
  },


  makeatable:async function (account,value,what) {
    table_body=""
    table_body+="<table style=\"width:100%\">";
    table_body+='<tr>';
    table_body +='<th>';
    table_body +=account;
    table_body +='</th>';
    table_body +='<th>';
    table_body +=value;
    table_body +='</th>';
    table_body +='<th>';
    table_body +=what;
    table_body +='</th>';
    table_body+='</tr>';
    table_body+='</table>';




    $(".table_un").append(table_body);




  },

  makeatable_sus:async function (account,value,what) {
    table_body1=""
    table_body1+="<table style=\"width:100%\">";
    table_body1+='<tr>';
    table_body1+='<td>';
    table_body1 +=account;
    table_body1 +='</td>';
    table_body1 +='<td>';
    table_body1 +=value;
    table_body1 +='</td>';
    table_body1 +='<td>';
    table_body1 +=what;
    table_body1 +='</td>';
    table_body1+='</tr>';
    table_body1+='</table>';




    $(".table_un1").append(table_body1);




  }












  
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
