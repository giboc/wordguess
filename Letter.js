
class Letter {
    constructor(value) {
        this.value = value;
        this.guessed = false;
    };
    get() {
        if (this.guessed === true)
            return this.value;
        else {
            var reg = new RegExp("['-:',.?; ]");
            if (reg.test(this.value))
                return this.value;
            else
                return '_';
        }
    };
    check(input) {
        if (input === this.value) {
            this.guessed = true;
            return true;
        }
        else
            return false;
    };
};

console.log("Letter.js loaded");

module.exports = Letter;
