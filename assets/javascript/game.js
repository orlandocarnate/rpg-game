// game.js

// Global Variables

// character objects
var characters = {
    harry: {
        name: "Harry Potter",
        healthPoints: 15,
        attackPower: 5,
        counterAttackPower: 5
    },

    hermione: {
        name: "Hermione Granger",
        healthPoints: 16,
        attackPower: 5,
        counterAttackPower: 5
    },

    ron: {
        name: "Ron Weasley",
        healthPoints: 13,
        attackPower: 5,
        counterAttackPower: 5
    },
}

// Display Character Cards
    // render cards with style tags using jQuery
function displayCards() {

    //For loop looks through each key and sub keys and gets the values
    for(var character in characters) {
        if (characters.hasOwnProperty(character)) {
            var charVal = characters[character];
            console.log(charVal.name);
            console.log(charVal.healthPoints);
            console.log(charVal.attackPower);
            console.log(charVal.counterAttackPower);
        }
    }
}
displayCards();


// Game Interaction Functions

// Select Character

// ATTACK button


