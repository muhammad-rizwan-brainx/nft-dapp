// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Ropstum is ERC20, ERC20Burnable, ReentrancyGuard, Ownable {
    constructor() ERC20("Ropstum", "RPM") {}

    uint256 _price = 100;

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function buyTokens(uint256 _amount) external payable {
        require(msg.value * 1e18 >= 100, "Not enough amount");
        _mint(msg.sender, _amount);
    }

    function burn(uint256 _amount) public override {
        _burn(msg.sender, _amount);
    }

    function withdrawFunds() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}
