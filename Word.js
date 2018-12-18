var Letter = require("./Letter.js");

class Word {
    constructor(word) {
        this.word = [];
        word = word.toUpperCase();
        for (var i = 0; i < word.length; i++) {
            var letter = new Letter(word[i]);
            this.word.push(letter);
        }
        this.print();
    };

    print() {
        var temp = "";
        this.word.forEach(function (letter) {
            temp += letter.get() + ' ';
        });
        console.log(temp);
    };

    guess(char) {
        var found = false;
        char = char.toUpperCase();
        this.word.forEach(function (letter) {
            if (letter.check(char)) {
                found = true;
            }
        })
        this.print();
        return found;
    }
    
    win() {
        var win = true;
        this.word.forEach(function (letter) {
            if (letter.get() === '_')
                win = false;
        });
        return win;
    }
}
console.log("Word.js loaded");
module.exports = Word;