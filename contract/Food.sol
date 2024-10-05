// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserPreferences {
    // Mapping from user address to preferences string
    mapping(address => string) public userPreferences;

    // Event to emit when preferences are updated
    event PreferencesUpdated(address indexed user, string preferences);

    // Function to set or update user preferences
    function setUserPreferences(string memory _preferences) public {
        userPreferences[msg.sender] = _preferences;
        emit PreferencesUpdated(msg.sender, _preferences);
    }

    // Function to get user preferences
    function getUserPreferences(address _user) public view returns (string memory) {
        return userPreferences[_user];
    }

    // Function to check if a user has set preferences
    function hasPreferences(address _user) public view returns (bool) {
        return bytes(userPreferences[_user]).length > 0;
    }
}