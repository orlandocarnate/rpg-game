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
            health: 120,
            attack: 8,
            counter: 7,
            image: "harry2.jpg"
        },
        {
            name: "Hermione Granger",
            health: 110,
            attack: 7,
            counter: 6,
            image: "Hermione2.jpg"
        },
        {
            name: "Ron Weasley",
            health: 100,
            attack: 6,
            counter: 5,
            image: "Ron_Weasley.jpg"
        },
        {
            name: "Draco Malfoy",
            health: 90,
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
            health: 190,
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
                
            // Create Card using APPEND
            $("#chooseChar").append($("<div/>", 
                {
                    "class": "card p-2", 
                    "id": cardID, 
                    "style": "width:150px;",
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
                        "class": "card-text text-center " + cardID,
                        text: value.health
                    }
                    ))
                    

                )
            )

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
            $("#"+playerID).addClass("bg-success");
            $("#"+playerID).appendTo("#yourCharacter");

            isFirstCard = false;
            $(".main-prompt").text("Choose your opponent");

    };

    function selectDefender () {

        // clear Battle Arena text
        $("#playerAttackDamage").text("");
        $("#enemyAttackDamage").text("");
        $("#arena-prompt").text("");

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

        // change background to red, rest to gray
        $("#"+defenderID).addClass("bg-danger");
        $(".card").not("#"+playerID+",#"+defenderID).addClass("bg-secondary");


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
        // Reload Page
        location.reload();
    };

    // ATTACK button
    function attackButton() {

        if (attackBtnActive) {
            // audioElement.play();
            console.log("ATTACK");
            console.log("Enemy Current HP: " + enemyHP);

            $("#playerAttackDamage").html("You attacked " + enemyName + " with <strong style='color: green'>" + playerAttack + "</strong> damage.");
            $("#enemyAttackDamage").html(enemyName + " attacked you with <strong style='color: red'>" + enemyCounter + "</strong> damage.");
            

            // Player Attacks First
            enemyHP -= playerAttack;

            // Player's Attack increases by base attack power
            playerAttack += baseAttackPower;
            console.log("New Attack Points: " + playerAttack);

            console.log("Enemy New HP: " + enemyHP);
            $(".card-text."+defenderID).text(enemyHP);

            // Check if opponent loses and if there are any cards left
            if (enemyHP <= 0) {
                // hide the attack button
                $("#attack").hide();

                // Change Attack key to You Win
                $(".main-prompt").text("You Won This Round!");
                $("#arena-prompt").text("Choose your next opponent!");

                // if there are any card elements left remove current opponent, otherwise Player Wins the Game
                if ($("#charactersLeft").children('.card').length > 0) {
                    // remove current opponent
                    $("#"+defenderID).remove();
                    // set isFirstCard to false and canPickCard to true to pick a new opponent or restart if done
                    isFirstCard = false;
                    canPickCard = true;
                    
                } else {
                    // PLAYER WINS GAME
                    status = 'You Won The Game!';

                    $(".main-prompt").text(status);
                    $("#arena-prompt").text("");

                    // PLAYER WINS GAME! DISPLAY MODAL
                    $("#modal-title").text(status);
                    $("#modal-text").text("Congratulations, " + playerName + "!");
                    $("#endgameModal").modal('show');

                    // hide the attack button
                    $("#attack").hide();

                    // Show restart button
                    $("#restart").fadeIn();

                }

                
            }

            // Enemy Counters

            playerHP -= enemyCounter;
            console.log("player HP: " + playerHP);
            $(".card-text."+playerID).text(playerHP);

            if (playerHP <= 0) {
                // Change Attack key to You Lose
                // $(".main-prompt").text("YOU LOST!");

                // hide the attack button
                $("#attack").hide();

                // Show restart button
                $("#restart").show();

                // turn off attack button
                attackBtnActive = false;
                // Show Restart button

                status = "You Were Defeated!";
                $("#modal-title").text(status);
                $("#modal-text").text(enemyName + " has defeated " + playerName);
                // $(".modal-body").text(modalText);
                $("#endgameModal").modal('show');
                
            }
        }
  
    };

    //----------- jQuery Event Listeners

    $("#attack").on("click", function() {
        attackButton();
    });

    $("#restart").on("click", function() {
        restartButton();
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
