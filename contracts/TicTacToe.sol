
pragma solidity ^0.4.2;


contract TicTacToe {
    //Store canidate
     //Read canidate
    struct Player {
        uint id;
        string name;
        address accnt;
        bool turn;
    }

    // Store accounts that have voted
    mapping(uint => uint)public board;
    // Store Candidates
    mapping(uint => Player)public players; 
    uint public playersCount;
    
    function TicTacToe() public{

    }

    function newGame(string _playeraName, address _playerAid, string _playerbName, address _playerBid) public {
        newPlayer(_playeraName, _playerAid);
        newPlayer(_playerbName, _playerBid);
        //Init board
        for (var i = 0; i < 9; i++) {

            board[i] = 0;
        }

    }
    
    event MoveEvent(

        uint indexed _location
    );

    event WinnerEvent(

        uint indexed _id
    );


    function move (uint _location) public {

        // require that they haven't voted before
        // require(msg.sender == players[1].accnt || players[2].accnt);
        if (players[1].accnt == msg.sender) {
            require(players[1].turn);
           // uint location = _row*3 + _column;
            require(board[_location] == 0);
            board[_location] = 1;
            players[1].turn = false;
            checkwinner(players[1].id);
            MoveEvent(_location);

        }
         else if (players[2].accnt == msg.sender) {
            require(!players[1].turn);
            //uint location2 = _row*3 + _column;
            require(board[_location] == 0);
            board[_location] = 2;
            players[1].turn = true;
            checkwinner(players[2].id);
            MoveEvent(_location);
        }
        
        // check winner
        // trigger voted event
    }

    function checkwinner (uint _id) public {
        if (board[0] == board[4] && board[4] == board[8] ||
            board[1] == board[4] && board[4] == board[7] ||
            board[3] == board[4] && board[4] == board[6] ||
            board[3] == board[4] && board[4] == board[5]) {
            if (board[4] == 1) {
                    //player1 won
                WinnerEvent(_id);
            }else if (board[4] == 2) {
                WinnerEvent(_id);
                    //player 2 won
            }
        }else if (board[0] == board[1] && board[1] == board[2] ||
                board[0] == board[3] && board[3] == board[6]) {
            if (board[0] == 1) {
                WinnerEvent(_id);
                    //player1 won
            }else if (board[0] == 2) {
                WinnerEvent(_id);
                    //player 2 won
            }
       /* }else if (board[2] == board[5]&&board[5] == board[8]||board[6] == board[7]&&board[7] == board[8]) {
            if (board[8] == 1) {
                WinnerEvent(_name);
                    //player1 won
            }else if (board[8] == 2) {
                WinnerEvent(_name);
                    //player 2 won
            }
          */      
        }else {
            //Check if board is full
        }
    }  
     
    function newPlayer (string _name, address _address) private {

        playersCount++;
        if (playersCount == 1) {
            players[playersCount] = Player(playersCount, _name, _address, true);
        }else {
            players[playersCount] = Player(playersCount, _name, _address, false);
        }
    } 
  
}