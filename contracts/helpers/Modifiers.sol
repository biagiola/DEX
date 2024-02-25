// SPDX-License-Identifier: UNLICENSE
pragma solidity ^0.8.9;

contract Modifier {
  modifier onlyOwner(address owner) {
    require(msg.sender == owner, "You're not the owner");
    _;
  }
}