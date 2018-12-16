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
            counterAttackPower: 5,
            image: "harry2.jpg"
        },
        {
            name: "Hermione Granger",
            healthPoints: 16,
            attackPower: 5,
            counterAttackPower: 5,
            image: "Hermione2.jpg"
        },
        {
            name: "Ron Weasley",
            healthPoints: 13,
            attackPower: 5,
            counterAttackPower: 5,
            image: "Ron_Weasley.jpg"
        }
    ];

    // Display Character Cards
        // render cards with style tags using jQuery
    // Reguar JavaScript For Loop functions will not work with jQuery.
    // use $.each() for loops.
    // Outer key, value pairs

    function displayCards() {
        $.each(characters, function(key, value) {
            // var currentChar = value;
            console.log(key);
            console.log(value.name);
            console.log(value.healthPoints);
            console.log(value.attackPower);
            console.log(value.counterAttackPower);
    
                
            $("#chooseChar").append("<div class='card card" + key + "' style='width:200px'>");
            $(".card.card"+key).attr("name", value.name);
            $(".card.card"+key).attr("healthpoints", value.healthPoints);
            $(".card.card"+key).attr("attackpower", value.attackPower);
            $(".card.card"+key).attr("counterattackpower", value.counterAttackPower);
    
            $(".card.card"+key).append("<div class='card-body card" + key + "'>");
    
            $(".card-body.card"+key).append("<img class='card-img-top' src='assets/images/"+value.image+"'>");
            $(".card-body.card"+key).append("<div class='card-title card"+key+"'>");
            $(".card-body.card"+key).append("<div class='card-text card"+key+"'>");
    
            $(".card-title.card"+key).text(value.name);
    
            $(".card-text.card"+key).text(value.healthPoints);
    
    
            /*
            // Inner Key, Value pairs
            $.each(currentChar, function (key, val){
    
                console.log("" + key + ": " + val);
    
                // create Cards for each character
                
                charCard.text(val)
                
            */
    
    
            
    
        });
    }

    // };

    displayCards();


    // Game Interaction Functions

    // Select Character

    // ATTACK button
    $(".attack-button").on("click", function() {
        audioElement.play();
      });

    // get info from Cards on click
    $(".card").on("click", function () {
        
        var cardName = $(this).attr("name");
        var cardHP = $(this).attr("healthPoints");
        var cardAttack = $(this).attr("attackPower");
        var cardCounter = $(this).attr("counterAttackPower");
        var alertText = cardName + ' has ' + cardHP + ' health, ' 
            + cardAttack + ' attack, ' + ', and ' + cardCounter + ' counter points.'
        alert(alertText);
    })

});
