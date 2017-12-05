window.onload = function(e) { //makes sure window is loaded
  console.log("==window loaded==");

  function Player(name, roundScore, totalScore){
    console.log("==Player==");
    this.name = name;
    this.roundScore = roundScore;
    this.totalScore = totalScore;
  };
  var game = {
    playerArray: [],
    currentPlayer: 0,
    round: 1,
    phraseArray: ["dime a dozen", "piece of cake", "diamond is forever", "drop in the ocean", "foot in the door", "little bird told me", "busy as a bee", "break the ice", "burst your bubble", "happy as a clam"],
    wheelArray: [5000, 300, 600, 0, 500, 250, 550, 400, 350, 900, 450, 700, 800],
    currentPhrase: "",
    currentValue: "",
    activateButtons: function(){
      console.log("==activateButtons==");
      $('#startGame').on('click', game.checkUser);
      $('#loadPuzzle').on('click', game.loadPuzzle);
    },
    checkUser: function(){
      console.log("--checkUser--");
      if ($('#userName_1').val()) {
        game.makePlayers();
      } else {
        alert("Please enter a name for player one.")
      }
    },
    makePlayers: function(){
      console.log("==makePlayers==");
      $('#startModal').css("display", "none");
      var playerOneName = $('#userName_1').val()
      var playerTwoName = $('#userName_2').val()
      var playerThreeName = $('#userName_3').val()
      $('#player_1').text(playerOneName);
      $('#player_1').css("color", "#FB6542");
      var playerOne = new Player(playerOneName, 0, 0);
      game.playerArray.push(playerOne);
      if (playerTwoName) {
        $('#player_2').text(playerTwoName);
        var playerTwo = new Player(playerTwoName, 0, 0);
        game.playerArray.push(playerTwo);
      };
      if (playerThreeName) {
        $('#player_3').text(playerThreeName);
        var playerThree = new Player(playerThreeName, 0, 0);
        game.playerArray.push(playerThree);
      };
      console.log("game.playerArray", game.playerArray);
    },
    loadPuzzle: function(){
      console.log("--loadPuzzle--");
      var randomPhrase = game.phraseArray[Math.floor(Math.random() * game.phraseArray.length)];
      game.currentPhrase = randomPhrase;
      $('#gameDisplay').empty();
      for (var i = 0; i < game.currentPhrase.length; i++) {
        var currentLetter = game.currentPhrase[i];
        console.log("game.currentPhrase", game.currentPhrase);
        // console.log("currentLetter", currentLetter);
        $('#gameDisplay').append("<div class='highlightLetter' id='letter_" + i + "'> <p class='individualLetter'>" + currentLetter + "</p> </div>");
        if (currentLetter == " ") {
          console.log("blank");
          $('#letter_' + i).css("border-color", "#eee");
        }
      };
      $('#enterLetter').val("");
      $('#spin').on('click', game.spinWheel);
    },
    spinWheel: function(){
      console.log("--spinWheel--");
      var randomWheel = game.wheelArray[Math.floor(Math.random() * game.wheelArray.length)];
      game.currentValue = randomWheel;
      console.log("game.currentValue", game.currentValue);
      if (game.currentValue == 0) {
        $('#currentWheel').text("Bankrupt!");
        game.bankrupt();
      } else {
        $('#currentWheel').text("$" + game.currentValue);
      };
      $('#endGame').on('click', game.endGame);
      $('#guessLetter').on('click', game.checkLetter);
      $('#vowel').on('click', game.buyVowel);
      $('#solve').on('click', game.solvePuzzle);
    },
    checkLetter: function(){
      console.log("--checkLetter--");
      var guessedLetter = $('#enterLetter').val();
      if (guessedLetter.length != 0) {
        var letterCount = 0;
        for (var i = 0; i < game.currentPhrase.length; i++) {
          if (game.currentPhrase[i] == guessedLetter) {
            $('#letter_' + i + '> p').css("visibility", "visible");
            letterCount++;
          } else {
            console.log("==checkNextLetter==");
          }
        }
        if (letterCount == 0) {
          game.currentPlayer = game.currentPlayer+1;
          if (game.currentPlayer == game.playerArray.length) {
            game.currentPlayer = 0;
          }
        } else {
          game.addScore();
        }
        $('#enterLetter').val("");
      } else {
        alert("Please enter a letter")
      };
      console.log("game.currentPlayer", game.currentPlayer);
      game.highlightPlayer();
    },
    addScore: function(){
      console.log("==addScore==");
      if (game.currentPlayer == 0){
        var updateOneScore = (game.playerArray[0].roundScore + game.currentValue);
        game.playerArray[0].roundScore = updateOneScore; // adding the score per number of letters
        $('#roundScore_1').text(updateOneScore);
        // console.log("game.playerArray[0].roundScore", game.playerArray[0].roundScore);
      };
      if (game.currentPlayer == 1){
        var updateTwoScore = (game.playerArray[1].roundScore + game.currentValue);
        game.playerArray[1].roundScore = updateTwoScore;
        $('#roundScore_2').text(updateTwoScore);
      };
      if (game.currentPlayer == 2){
        var updateThreeScore = (game.playerArray[2].roundScore + game.currentValue);
        game.playerArray[2].roundScore = updateThreeScore;
        $('#roundScore_3').text(updateThreeScore);
      };
    },
    buyVowel: function(){
      console.log("--buyVowel--");
      var guessedVowel = $('#enterLetter').val();
      var vowels = "aeiou";
      if (game.currentPlayer == 0){
        if (game.playerArray[0].roundScore > 250) {
          alert("Please enter a vowel and click guess letter.");
          var correctValue = vowels.indexOf(guessedVowel);
          if (correctValue == -1) {
            alert("Please guest a vowel")
          } else {
            var newScoreOne = game.playerArray[0].roundScore - 250;
            game.playerArray[0].roundScore = newScoreOne;
            $('#roundScore_1').text(newScoreOne);
            console.log("newScore", newScoreOne);
          }
        } else {
          alert("You do not have enough money to buy a vowel, please enter a consonant.")
        }
      } else if (game.currentPlayer == 1) {
        if (game.playerArray[1].roundScore > 250) {
          alert("Please enter a vowel and click guess letter.");
          var correctValue = vowels.indexOf(guessedVowel);
          if (correctValue == -1) {
            alert("Please guest a vowel")
          } else {
            var newScoreTwo = game.playerArray[1].roundScore - 250;
            game.playerArray[1].roundScore = newScoreTwo;
            $('#roundScore_2').text(newScoreTwo);
          }
        } else {
          alert("You do not have enough money to buy a vowel, please enter a consonant.")
        }
      } else {
        if (game.playerArray[2].roundScore > 250) {
          alert("Please enter a vowel and click guess letter.");
          var correctValue = vowels.indexOf(guessedVowel);
          if (correctValue == -1) {
            alert("Please guest a vowel")
          } else {
            var newScoreThree = game.playerArray[2].roundScore - 250;
            game.playerArray[2].roundScore = newScoreThree;
            $('#roundScore_3').text(newScoreThree);
          }
        } else {
          alert("You do not have enough money to buy a vowel, please enter a consonant.")
        }
      }
    },
    highlightPlayer: function(){
      console.log("==highlightPlayer==");
      if (game.currentPlayer == 0){
        alert("Please spin the wheel!");
        $('#player_1').css("color", "#FB6542");
      } else {
        $('#player_1').css("color", "#000");
      };
      if (game.currentPlayer == 1){
        alert("Please spin the wheel!");
        $('#player_2').css("color", "#FB6542");
      } else {
        $('#player_2').css("color", "#000");
      };
      if (game.currentPlayer == 2){
        alert("Please spin the wheel!");
        $('#player_3').css("color", "#FB6542");
      } else {
        $('#player_3').css("color", "#000");
      };
    },
    bankrupt: function(){
      console.log("==bankrupt==");
      if (game.currentPlayer == 0){
        $('#roundScore_1').text(0);
        game.currentPlayer = game.currentPlayer+1;
        if (game.currentPlayer == game.playerArray.length) {
          game.currentPlayer = 0;
        };
      };
      if (game.currentPlayer == 1){
        $('#roundScore_2').text(0);
        game.currentPlayer = game.currentPlayer+1;
        if (game.currentPlayer == game.playerArray.length) {
          game.currentPlayer = 0;
        };
      };
      if (game.currentPlayer == 2){
        $('#roundScore_3').text(0);
        game.currentPlayer = game.currentPlayer+1;
        if (game.currentPlayer == game.playerArray.length) {
          game.currentPlayer = 0;
        };
      };
    },
    solvePuzzle: function(){
      console.log("--solvePuzzle--");
      var guessedWord = $('#enterLetter').val()
      if (guessedWord == game.currentPhrase) {
        $('.highlightLetter > p').css("visibility", "visible");
        alert("Correct! Load new puzzle.");
        game.currentPlayer = game.currentPlayer+1;
        if (game.currentPlayer == game.playerArray.length) {
          game.currentPlayer = 0;
        };
        game.addTotalScore();
        $('#gameDisplay').empty();
        } else {
        alert("That is not the word.")
        game.currentPlayer = game.currentPlayer+1;
        if (game.currentPlayer == game.playerArray.length) {
          game.currentPlayer = 0;
        game.highlightPlayer();
        };
      };
    },
    addTotalScore: function(){
      console.log("==addTotalScore==");
      if (game.currentPlayer == 0){
        var updateTotalOne = (game.playerArray[0].totalScore + game.playerArray[0].roundScore);
        game.playerArray[0].totalScore = updateTotalOne;
        $('#totalScore_1').text(updateTotalOne);
        game.playerArray[0].roundScore = 0;
        $('#roundScore_1').text(0);
      } else {
        game.playerArray[0].roundScore = 0;
        $('#roundScore_1').text(0);
      };
      if (game.currentPlayer == 1){
        var updateTotalTwo = (game.playerArray[1].totalScore + game.playerArray[1].roundScore);
        game.playerArray[1].totalScore = updateTotalTwo;
        $('#totalScore_2').text(updateTotalTwo);
        game.playerArray[1].roundScore = 0;
        $('#roundScore_2').text(0);
      } else {
        game.playerArray[1].roundScore = 0;
        $('#roundScore_2').text(0);
      };
      if (game.currentPlayer == 2){
        var updateTotalThree = (game.playerArray[2].totalScore + game.playerArray[2].roundScore);
        game.playerArray[2].totalScore = updateTotalThree;
        $('#totalScore_3').text(updateTotalThree);
        game.playerArray[2].roundScore = 0;
        $('#roundScore_3').text(0);
      } else {
        game.playerArray[2].roundScore = 0;
        $('#roundScore_3').text(0);
      };
    },
    endGame: function(){
      console.log("--endGame--");
      if (game.playerArray.length == 1) {
        alert("You are the winner!")
      };
      if (game.playerArray.length == 2) {
        if (game.playerArray[0].totalScore > game.playerArray[1].totalScore) {
          console.log(game.playerArray[0].name, "is the winner!")
        } else {
          console.log(game.playerArray[1].name, "is the winner!")
        }
      };
      if (game.playerArray.length == 3) {
        if (game.playerArray[0].totalScore > game.playerArray[1].totalScore && game.playerArray[2].totalScore) {
          console.log(game.playerArray[0].name, "is the winner!")
        } else if (game.playerArray[1].totalScore > game.playerArray[0].totalScore && game.playerArray[2].totalScore) {
          console.log(game.playerArray[1].name, "is the winner!")
        } else {
          console.log(game.playerArray[3].name, "is the winner!")
        }
      }
    }
  };
Player();
game.activateButtons();
};
