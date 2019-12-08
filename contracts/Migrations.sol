pragma solidity ^0.4.2;


contract Migrations {

    address public owner;
    uint public lastcompletedmigration;

    modifier restricted() {

        if (msg.sender == owner) _;
    }

    function Migrations() {
        owner = msg.sender;
    }

    function setCompleted(uint completed) restricted {
        lastcompletedmigration = completed;
    }

    function upgrade(address newaddress) restricted {
        Migrations upgraded = Migrations(newaddress);
        upgraded.setCompleted(lastcompletedmigration);
    }
}
