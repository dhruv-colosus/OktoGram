// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract OktogramNFT is ERC721URIStorage {
    uint256 private _tokenIds;

    constructor() ERC721("Oktogram", "OKT") {}

    function createNft(
        address user,
        string memory tokenURI
    ) public returns (uint256) {
        uint256 newItemId = _tokenIds;
        _mint(user, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokenIds += 1;
        return newItemId;
    }
}
