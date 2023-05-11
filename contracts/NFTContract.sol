// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";

contract NFTContract is ERC1155, Ownable, ERC1155Burnable {
    IERC20 public paymentToken;
    uint256 public tokenPrice = 100e18;
    uint256 public constant Hammer = 1;
    uint256 public constant OpenApes = 2;

    constructor()
        ERC1155(
            "https://ipfs.io/ipfs/QmceqiJhxNmcdjg2vdikWgMREyLPjHsVyhDmmDUB5npio8"
        )
    {
        //setPaymentToken("");
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function setPaymentToken(address _token) public onlyOwner {
        require(_token != address(0), "Cannot be Zero address");
        paymentToken = IERC20(0x2aCf9c27e6a3d149878b9E5B0E5a45DCb85717b5);
    }

    function setTokenPrice(uint256 _price) external onlyOwner {
        tokenPrice = _price;
    }

    function CustomURI(uint256 _id) public view returns (string memory) {
        string memory currentBaseURI = uri(_id);
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        Strings.toString(_id),
                        ".json"
                    )
                )
                : "";
    }

    function mintHammer(uint256 _amount) external {
        require(
            paymentToken.balanceOf(msg.sender) >= tokenPrice * _amount,
            "Not enough balance"
        );
        require(balanceOf(msg.sender, 1) < 1, "Not eligible");
        paymentToken.transfer(address(this), tokenPrice * _amount);
        _mint(msg.sender, 0, _amount, "");
    }

    function mintOpenApes(uint256 _amount) external {
        require(
            paymentToken.balanceOf(msg.sender) >= tokenPrice * _amount,
            "Not enough balance"
        );
        require(balanceOf(msg.sender, 0) < 1, "Not eligible");
        paymentToken.transfer(address(this), tokenPrice * _amount);
        _mint(msg.sender, 1, _amount, "");
    }

    function withdrawFunds() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}
