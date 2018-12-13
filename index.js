var Letter = require('./Letter.js');
var Word = require('./Word.js');
var inquirer = require("inquirer");
var fs = require('fs');

var guessesMade = [""];

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
                if (input.letter.length > 1) {
                    console.log("Please enter only 1 letter!");
                    makeGuess(attempts, word);
                }
                else {
                    if (word.guess(input.letter)) {
                        console.log("CORRECT!");
                        if (!word.win())
                            makeGuess(attempts, word);
                        else {
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
                    else {
                        var temp = false;
                        guessesMade.forEach(function (guess) {
                            if (guess === input.letter) {
                                temp = true;
                            }
                        });
                        guessesMade.push(input.letter);
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
