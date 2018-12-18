var Letter = require('./Letter.js');
var Word = require('./Word.js');
var inquirer = require("inquirer");
var fs = require('fs');

//The basic logic for this game: 
//The script tries to read the word bank stored in a .txt file.
//It then selects one at a random, then calls the makeguess function.
//
//Makeguess is sort of a recursive function in that it calls itself.
//It first checks to see if there are remaining attempts left. If not, the game is over.
//Otherwise, it prompts the user to make a guess. After each guess, it handles the 
//guess in various ways and then calls itself again. When the word is completed, it
//opens up the word file again and selects a new word.


var guessesMade = [""]; //Keeps track of wrong guesses.

//This is kind of a recursive function. It calls
function makeGuess(attempts, word) {
    if (attempts > 0) {
        inquirer
            .prompt([
                {
                    name: 'letter',
                    message: 'Guess a letter!'
                }
            ])
            .then(function (input) {
                var doubleEntry = false;
                if (input.letter.length > 1) { //Input validation.
                    console.log("Please enter only 1 letter!");
                    makeGuess(attempts, word);
                }
                else {
                    if (word.guess(input.letter)) { //The guess is correct.
                        console.log("CORRECT!");
                        if (!word.win())  //Check to see if game is won. word.win() returns true when game is won.
                            makeGuess(attempts, word);
                        else { //Start a new game!
                            attempts = 0;
                            console.log("You win! Next round!");
                            fs.readFile('list.txt', 'utf8', function (err, line) {
                                if (err)
                                    console.log(err);
                                line = line.split('\n');
                                temp = line[Math.floor(Math.random() * line.length)];

                                var word = new Word(temp);
                                var attempts = 10;

                                makeGuess(attempts, word);
                            });
                        }
                    }
                    else { //Incorrect guess. 
                        var temp = false;
                        guessesMade.forEach(function (guess) {
                            if (guess === input.letter) {
                                temp = true;
                            }
                        });
                        guessesMade.push(input.letter);
                        //Handling multiple incorrect guesses that have been made before. Thus guessing 'x' and then 'x' again
                        //will penalize you only once. For correct guesses, it just displays the correct guess message.
                        if (temp){
                            console.log("INCORRECT. Attemps left: " + (attempts));
                            makeGuess(attempts, word);
                        }
                        else{
                            console.log("INCORRECT. Attemps left: " + (attempts-1));
                            makeGuess(attempts - 1, word);
                        }
                    }
                }
            });
    }
    else {
        console.log("Game over!");
        return false;
    }
}

fs.readFile('list.txt', 'utf8', function (err, line) {
    if (err)
        console.log(err);
    line = line.split('\n');
    var temp = line[Math.floor(Math.random() * line.length)];

    var word = new Word(temp);
    var attempts = 10;
    makeGuess(attempts, word);
});
