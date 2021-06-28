// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TMS {
  address public owner = msg.sender;
  uint public last_completed_transaction;

  modifier restricted() {
    require(
      msg.sender == owner,
      "This function is restricted to the contract's owner"
    );
    _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_transaction = completed;
  }
}
