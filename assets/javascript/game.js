// Make sure HTML is loaded before running
$(document).ready(function() {

    // Global Variables
    // Gets Link for Theme Song
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "assets/sounds/theme.mp3");

    // character objects
    var characters = [
        {
            name: "Harry Potter",
            healthPoints: 15,
            attackPower: 5,
            counterAttackPower: 5
        },
        {
            name: "Hermione Granger",
            healthPoints: 16,
            attackPower: 5,
            counterAttackPower: 5
        },
        {
            name: "Ron Weasley",
            healthPoints: 13,
            attackPower: 5,
            counterAttackPower: 5
        }
    ];

    // Display Character Cards
        // render cards with style tags using jQuery
    // Reguar JavaScript For Loop functions will not work with jQuery.
    // use $.each() for loops.
    // Outer key, value pairs
    $.each(characters, function(i, currentChar) {
        // Inner Key, Value pairs
        $.each(currentChar, function (key, val){

            console.log("" + key + ": " + val);

            // create Cards for each character
            var charCard = $("<div>");
            
        });

    });
    // };

    // displayCards();


    // Game Interaction Functions

    // Select Character

    // ATTACK button
    $(".attack-button").on("click", function() {
        audioElement.play();
      });

});
