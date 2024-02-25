// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./helpers/Modifiers.sol";
import "hardhat/console.sol";

contract DEX is Modifier {
    IERC20 public erc20Token;

    uint256 public price;
    address public owner;

    constructor(IERC20 _token, uint256 _price) {
        erc20Token = _token;
        owner = msg.sender;
        price = _price;
    }

    function withdrawTokens() external onlyOwner(address(this)) {
        uint256 balance = erc20Token.balanceOf(address(this));
        erc20Token.transfer(msg.sender, balance);
    }

    function getPrice(uint256 numTokens) public view returns (uint256) {
        return price * numTokens;
    }

    function getTokenBalance() external view returns(uint256) {
        return erc20Token.balanceOf(address(this));
    }

}
