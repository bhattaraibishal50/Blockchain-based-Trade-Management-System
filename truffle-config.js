const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();
const mnemonicPhrase = process.env.MNEMONIC;

module.exports = {
  networks: {

    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider({
          mnemonic: {
            phrase: mnemonicPhrase
          },
          providerOrUrl: process.env.rinkeby_test_url
        });
      },
      network_id: 4
    },

}
};
