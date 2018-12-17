// Make sure HTML is loaded before running
$(document).ready(function() {

    // Global Variables
    var status = "";
    var canPickCard = true;
    var isFirstCard = true;

    var baseAttackPower = 6;

    var playerName;
    var playerHP = 0;
    var playerAttack = 0;
    var playerCounter = 0;

    var playerID;
    var defenderID;

    var enemyName = 0;
    var enemyHP = 0;
    var enemyAttack = 0;
    var enemyCounter = 0;

    var attackBtnActive = false;

    // hide the attack & reset buttons
    $("#attack, #restart").hide();


    // Gets Link for Theme Song
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "assets/sounds/theme.mp3");

    // character objects
    var characters = [
        {
            name: "Harry Potter",
            health: 100,
            attack: 8,
            counter: 7,
            image: "harry2.jpg"
        },
        {
            name: "Hermione Granger",
            health: 100,
            attack: 7,
            counter: 6,
            image: "Hermione2.jpg"
        },
        {
            name: "Ron Weasley",
            health: 95,
            attack: 6,
            counter: 5,
            image: "Ron_Weasley.jpg"
        },
        {
            name: "Draco Malfoy",
            health: 80,
            attack: 5,
            counter: 4,
            image: "Draco-Malfoy-375-500.jpg"
        },
        {
            name: "Severus Snape",
            health: 150,
            attack: 9,
            counter: 8,
            image: "Severus_Snape.jpg"
        },
        {
            name: "Voldemort",
            health: 200,
            attack: 10,
            counter: 9,
            image: "voldemort.jpg"
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
            console.log(value.health);
            console.log(value.attack);
            console.log(value.counter);
            
            var cardID = "card"+ key;
                
            // Create Card
            $("#chooseChar").append($("<div/>", 
                {
                    "class": "card", 
                    "id": cardID, 
                    "style": "width:150px",
                    "name": value.name,
                    "healthpoints": value.health,
                    "attackpower": value.attack,
                    "counterattackpower": value.counter
                }
                )
                .append($("<div/>",
                    {
                        "class": 'card-body'
                    } 
                )
                    .append($("<img/>",
                    {
                        "class":"card-img-top",
                        "src": "assets/images/" + value.image
                    }
                    ))
                    .append($("<div/>",
                    {
                        "class": "card-title text-center "+ cardID,
                        text: value.name
                    }
                    ))
                    .append($("<div/>",
                    {
                        "class": "card-text text-center text-success " + cardID,
                        text: value.health
                    }
                    ))
                    

                )
            )
                    

                /*
                .append($("<div/>",
                    {
                        "class": 'card-body'
                    } 
                    )).append($("<img/>",
                        {
                            "class":"card-img-top",
                            "src": "assets/images/" + value.image
                        } 
                    )).append($("<div/>",
                        {
                            "class": "card-title "+ cardID
                        } 
                    )).append($("<div/>",
                        {
                            "class": "card-text " + cardID
                        }
                    ))
                        */

            // $("#chooseChar").append("<div class='card' id='card" + key + "' style='width:200px'>");
            // $("#"+cardID).attr("name", value.name);
            // $("#"+cardID).attr("healthpoints", value.health);
            // $("#"+cardID).attr("attackpower", value.attack);
            // $("#"+cardID).attr("counterattackpower", value.counter);
    
            // $("#"+cardID).append("<div class='card-body card" + key + "'>");
    
            // $(".card-body."+"#"+cardID).append("<img class='card-img-top' src='assets/images/"+value.image+"'>");
            // $(".card-body."+"#"+cardID).append("<div class='card-title card"+key+"'>");
            // $(".card-body."+"#"+cardID).append("<div class='card-text card"+key+"'>");
    
            // $(".card-title."+cardID).text(value.name);
    
            // $(".card-text."+cardID).text(value.health);            
    
        });
    };

    // run the function
    displayCards();

    // Game Interaction Functions

    // Select Character
    function selectPlayer () {

            // alert("Card Clicked");
    
            // Get ID
            // var playerID = "#"+$(this).attr("id");
            console.log("PlayerID: " + playerID);
    
            // Get health, attack, and counter values
            playerName = $("#"+playerID).attr("name");
            playerHP = parseInt($("#"+playerID).attr("healthpoints"));
            playerAttack = parseInt($("#"+playerID).attr("attackpower"));
            playerCounter = parseInt($("#"+playerID).attr("counterattackpower"));

            // Fade out then move to new location then fade in
            // Move card to Your Character Section
            $("#"+playerID).appendTo("#yourCharacter");

            isFirstCard = false;
            $(".main-prompt").text("Choose your opponent");

    };

    function selectDefender () {

        // change text


        // Get ID

        console.log("DefenderID: "+ defenderID);

        // Get health, attack, and counter values
        enemyName = $("#"+defenderID).attr("name");
        console.log("Defender: " + enemyName);
        enemyHP = parseInt($("#"+defenderID).attr("healthpoints"));
        console.log("Defender HP: " + enemyHP);
        // enemyAttack = parseInt($(this).attr("attackPower"));
        enemyCounter = parseInt($("#"+defenderID).attr("counterattackpower"));
        canPickCard = false;

        // Move card to Defender Section
        $("#"+defenderID).appendTo("#defender");
        
        // Change main prompt
        $(".main-prompt").text("BATTLE!");

        // fade IN the attack button
        $("#attack").fadeIn();

        // turn on attack button
        attackBtnActive = true;

        // move remaining cards to Characters Left section
        $(".card").not("#"+playerID+",#"+defenderID).each(function (index) {
            $(this).appendTo("#charactersLeft");
        });

        // create text for Modal pop
        // var modalText = ' health: '+ cardHP + ', attack: ' + cardAttack + ', counter: ' + cardCounter;
        // $(".modal-title").text(cardName);
        // $(".modal-body").text(modalText);
};

    // RESTART button
    function restartButton() {



        // CLEAR all children elements from player, opponent, and chars left elements

        $("#yourCharacter, #defender, #charactersLeft").remove();
    
        // hide the attack & reset buttons
        $("#restart").fadeOut();

        // Reload the cards
        displayCards();

    };

    // ATTACK button
    function attackButton() {

        if (attackBtnActive) {
            // audioElement.play();
            console.log("ATTACK");
            console.log("Enemy Current HP: " + enemyHP);

            // First Player attacks
            enemyHP -= playerAttack;
            console.log("Enemy New HP: " + enemyHP);
            $(".card-text."+defenderID).text(enemyHP);

            // Check if opponent loses and if there are any cards left
            if (enemyHP <= 0) {
                // Change Attack key to You Win
                $(".main-prompt").text("YOU WIN!");

                // hide the attack button
                $("#attack").fadeOut(1000);

                // if there are any card elements left remove current opponent, otherwise Player Wins the Game
                // alert("Cards Left: " + $("#charactersLeft").children('.card').length);
                if ($("#charactersLeft").children('.card').length > 0) {
                    // remove current opponent
                    $("#"+defenderID).remove();
                    // set isFirstCard to false and canPickCard to true to pick a new opponent or restart if done
                    isFirstCard = false;
                    canPickCard = true;
                    
                } else {
                    status = 'YOU WON THE GAME!';
                    // PLAYER WINS GAME! DISPLAY MODAL
                    // var modalText = ' health: '+ cardHP + ', attack: ' + cardAttack + ', counter: ' + cardCounter;
                    $(".modal-title").text(status);
                    // $(".modal-body").text(modalText);
                    $("#endgameModal").modal('show');

                }

                
            }

            // update player stats
            playerAttack += baseAttackPower;
            console.log("New Attack Points: " + playerAttack);
            playerHP -= enemyCounter;
            console.log("player HP: " + playerHP);
            $(".card-text."+playerID).text(playerHP);

            if (playerHP <= 0) {
                // Change Attack key to You Lose
                // $(".main-prompt").text("YOU LOST!");

                // hide the attack button
                $("#attack").fadeOut(1000);
                $("#restart").fadeIn();

                // turn off attack button
                attackBtnActive = false;
                // Show Restart button

                status = "YOU WERE DEFEATED!"
                $(".modal-title").text(status);
                // $(".modal-body").text(modalText);
                $("#endgameModal").modal('show');
                
            }
        }
  
    };


    // jQuery Event Listeners

    $("#attack").on("click", function() {
        attackButton();
    });

    $("#restart").on("click", function() {
        location.reload();
        /*
        restartButton();
        // reset variables and booleans
        canPickCard = true;
        isFirstCard = true;
        baseAttackPower = 6;
        attackBtnActive = false;
        alert("Pick Card: " + canPickCard + ", First Card: " + isFirstCard);
        */
    });

    // Click Card event
    $( ".card").on("click", function () {

        // Can the player pick a card?
        if (canPickCard) {
            // alert($(this).attr("id") + " First Card? "+isFirstCard);
            // Is the player selecting the first card?
            if (isFirstCard) {
                playerID = $(this).attr("id");
                isFirstCard = false;
                selectPlayer();
            }
            // Otherwise select the second card
            else {
                defenderID = $(this).attr("id");
                // make sure first card can not be picked again this round
                if (defenderID !== playerID) {
                    selectDefender();
                }
            }
        }
        
    });

    
});
