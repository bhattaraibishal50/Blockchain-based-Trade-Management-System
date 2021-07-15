
pragma solidity ^0.8.1;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
contract Token is ERC721 {
    /// @param _name Token Name
    /// @param _symbol Token symbol
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol)
    {
        _mint(msg.sender, 100000000000000000000000);
    }
}