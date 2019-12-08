App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("TicTacToe.json", function(tictactoe) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.TicTacToe = TruffleContract(tictactoe);
      // Connect provider to interact with contract
      App.contracts.TicTacToe.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.TicTacToe.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.MoveEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new vote is recorded
        App.render();
      });
      instance.WinnerEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new vote is recorded
        App.render();
      });
    });
  },


    render: function() {
      var tictactoeInstance;
      // Load account data
      web3.eth.getCoinbase(function(err, account) {
        if (err === null) {
          App.account = account;
          $("#accountAddress").html("Your Account: " + account);
        }
      });
  
      // Load contract data
      App.contracts.TicTacToe.deployed().then(function(instance) {
        tictactoeInstance = instance;
        //console.log(tictactoeInstance.board);
       // return tictactoeInstance.players();
    //  }).then(function(board) {
        var y = 0;
        for(var t =0; t<9; t++){
         
          tictactoeInstance.board(t).then(function(valu) {
            
          //var res = valu.map(a)
          //
          
          console.log(y);
          if (valu.c[0] == 1){
            $("#"+y).html("X")
            y+=1;
          }else if (valu.c[0] == 2){
            $("#"+y).html("O")
            y+=1;
          }else{
            $("#"+y).html("-")
            y+=1;
          }
        });
      }
         /*var box1 = $("#0");
      box1.click(function(){
        box1.text("X")
        //.css({"font-size": "50px"});*/
      });
    
        return tictactoeInstance
    }
  };
  
    /*castMove: function() {
      var location = 1;
      //$('#candidatesSelect').val();
      App.contracts.TicTacToe.deployed().then(function(instance) {
        return instance.move(location, { from: App.account });
      }).then(function(result) {
        // Wait for votes to update
       // $("#content").hide();
      //  $("#loader").show();
      }).catch(function(err) {
        console.error(err);
      });
    }
  };
  */
  $(function() {
    $(window).load(function() {
     
      App.init();
    });
  });

  /*

   // $("tr").click(function(){
      //  $("tr").eq(1).text("O");
     // });
    
       /* var candidatesResults = $("#candidatesResults");
        candidatesResults.empty();

        var candidatesSelect = $('#candidatesSelect');
        candidatesSelect.empty();
  
        for (var i = 1; i <= candidatesCount; i++) {
          electionInstance.candidates(i).then(function(candidate) {
            var id = candidate[0];
            var name = candidate[1];
            var voteCount = candidate[2];
  
            // Render candidate Result
            var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
            candidatesResults.append(candidateTemplate);
  
            // Render candidate ballot option
            var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
            candidatesSelect.append(candidateOption);
          });
        }*/
  //.(App.account);
    /*  }).then(function(hasMoved) {
        // Do not allow a user to vote
      //  if(hasMoved) {
      //    $('form').hide();
      //  }
     //   loader.hide();
      //  content.show();
      }).catch(function(error) {
        console.warn(error);
      });*/