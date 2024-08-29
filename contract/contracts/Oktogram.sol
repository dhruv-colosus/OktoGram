// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Oktogram is Ownable(msg.sender) {
    using EnumerableSet for EnumerableSet.AddressSet;

    struct User {
        address author;
        string name;
    }

    struct Post {
        uint256 id;
        User user;
        string image;
        string content;
        uint256 createdAt;
        uint256 likes;
        uint256 tips;
        bool isGiveaway;
        bool giveawayCompleted;
        address nftAddress;
        uint256 nftTokenId;
        uint256 targetLikes;
    }

    struct Story {
        uint256 id;
        User user;
        string image;
        uint256 createdAt;
    }

    uint256 private _postCounter = 0;
    uint256 private _storyCounter = 0;
    mapping(address => string) _users;
    mapping(uint256 => Post) _posts;
    mapping(uint256 => Story) _stories;
    mapping(uint256 => mapping(address => uint256)) _tips;
    mapping(uint256 => EnumerableSet.AddressSet) _likers;
    mapping(address => User[]) _friends;

    function createStory(string memory username, string memory image) public {
        _storyCounter++;
        uint256 storyId = _storyCounter;

        Story storage newStory = _stories[storyId];
        newStory.id = storyId;
        newStory.user = User({author: msg.sender, name: username});
        newStory.image = image;
        newStory.createdAt = block.number;
    }

    function createPost(
        string memory username,
        string memory image,
        string memory content
    ) public {
        _postCounter++;
        uint256 postId = _postCounter;

        Post storage newPost = _posts[postId];
        newPost.id = postId;
        newPost.user = User({author: msg.sender, name: username});
        newPost.image = image;
        newPost.content = content;
        newPost.createdAt = block.number;
        newPost.likes = 0;
        newPost.tips = 0;
        newPost.isGiveaway = false;
        newPost.giveawayCompleted = true;
    }

    function createGiveawayPost(
        string memory username,
        string memory image,
        string memory content,
        address nftAddress,
        uint256 nftTokenId,
        uint256 targetLikes
    ) public {
        require(targetLikes > 0, "Target likes must be greater than 0");

        IERC721 nft = IERC721(nftAddress);
        require(nft.ownerOf(nftTokenId) == msg.sender, "You must own the NFT");

        _postCounter++;
        uint256 postId = _postCounter;

        Post storage newPost = _posts[postId];
        newPost.id = postId;
        newPost.user = User({author: msg.sender, name: username});
        newPost.image = image;
        newPost.content = content;
        newPost.createdAt = block.number;
        newPost.likes = 0;
        newPost.tips = 0;
        newPost.isGiveaway = true;
        newPost.nftAddress = nftAddress;
        newPost.nftTokenId = nftTokenId;
        newPost.targetLikes = targetLikes;

        nft.transferFrom(msg.sender, address(this), nftTokenId);
    }

    function toggleLike(uint256 postId) public {
        Post storage post = _posts[postId];
        require(post.user.author != address(0), "Post does not exist");
        if (_likers[postId].contains(msg.sender)) {
            _likers[postId].remove(msg.sender);
            post.likes--;
        } else {
            _likers[postId].add(msg.sender);
            post.likes++;
            if (
                post.isGiveaway &&
                post.likes >= post.targetLikes &&
                !post.giveawayCompleted
            ) {
                executeGiveaway(postId);
            }
        }
    }

    function executeGiveaway(uint256 postId) internal {
        Post storage post = _posts[postId];
        require(post.isGiveaway, "Not a giveaway post");
        require(post.likes >= post.targetLikes, "Target likes not reached");
        require(!post.giveawayCompleted, "Giveaway has been completed");

        address winner = getWinner(postId);
        IERC721 nft = IERC721(_posts[postId].nftAddress);
        nft.transferFrom(address(this), winner, post.nftTokenId);
    }

    function getWinner(uint256 postId) private view returns (address) {
        uint256 length = _likers[postId].length();
        require(length > 0, "Likes is empty");

        uint256 randomIndex = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, block.prevrandao, msg.sender)
            )
        ) % length;

        return _likers[postId].at(randomIndex);
    }

    function getAllPosts() external view returns (Post[] memory) {
        Post[] memory allPosts = new Post[](_postCounter);
        for (uint256 i = 1; i <= _postCounter; i++) {
            allPosts[i - 1] = _posts[i];
        }

        return allPosts;
    }

    function getAllStories() external view returns (Story[] memory) {
        Story[] memory allStories = new Story[](_storyCounter);
        for (uint256 i = 1; i <= _storyCounter; i++) {
            allStories[i - 1] = _stories[i];
        }

        return allStories;
    }

    function addFriend() external {}
}
