// Make sure HTML is loaded before running
$(document).ready(function () {

    // Global Variables
    var status = "";
    var canPickCard = true;
    var isFirstCard = true;
    var baseAttackPower = 0;
    var playerName;
    var playerHP = 0;
    var playerAttack = 0;
    var playerID;
    var defenderID;
    var enemyName;
    var enemyHP = 0;
    var enemyCounter = 0;
    var attackBtnActive = false;
    var totalCardCount; // used for moving all cards back to choose area
    var enemyCardCount; // used to determine how many cards are left.

    var attackBtn = $("#attack");
    var restartBtn = $("#restart");

    // hide the attack & reset buttons
    attackBtn.hide();
    restartBtn.hide();

    var soundList = [
        "Expelliarmus.mp3", "Immobilus.mp3", "Obliviate.mp3", "Stupefy.mp3"
    ];

    // create Audio elements
    var soundfx = document.createElement("audio");
    var audioTheme = document.createElement("audio");
    audioTheme.setAttribute("src", "assets/sounds/theme.mp3");
    audioTheme.volume = .1;

    // character objects
    var characters = [
        {
            name: "Harry Potter",
            health: 120,
            attack: 8,
            counter: 15,
            image: "harry2.jpg"
        },
        {
            name: "Hermione Granger",
            health: 110,
            attack: 7,
            counter: 12,
            image: "Hermione2.jpg"
        },
        {
            name: "Ron Weasley",
            health: 100,
            attack: 6,
            counter: 10,
            image: "Ron_Weasley.jpg"
        },
        {
            name: "Draco Malfoy",
            health: 80,
            attack: 4,
            counter: 8,
            image: "Draco-Malfoy-375-500.jpg"
        },
        {
            name: "Severus Snape",
            health: 150,
            attack: 9,
            counter: 20,
            image: "Severus_Snape.jpg"
        },
        {
            name: "Voldemort",
            health: 180,
            attack: 11,
            counter: 25,
            image: "voldemort.jpg"
        }

    ];

    totalCardCount = characters.length;
    console.log("Total Cards: " + totalCardCount);

    enemyCardCount = totalCardCount - 1;
    console.log("Starting Enemy Card Count: " + enemyCardCount);

    // GAME OBJECT
    var rpg = {
        // property: value,
        // method: function {}
        displayCards: function () {
            // use $.each() for looping through object array
            
            $.each(characters, function (key, value) {
    
                console.log(value.name);
                console.log(value.health);
                console.log(value.attack);
                console.log(value.counter);
    
                var cardID = "card" + key;
    
                // Create Card using APPEND
                
                var chosenChar = $("<div/>",
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
                    "class": "card-img-top",
                    "src": "assets/images/" + value.image
                }
                ))
                .append($("<div/>",
                {
                    "class": "card-title text-center " + cardID,
                    text: value.name
                }
                ))
                .append($("<div/>",
                {
                    "class": "card-text text-center " + cardID,
                    text: value.health
                }
                )))
                $("#chooseChar").append(chosenChar);
            });
        },

        selectPlayer: function() {
            // play short theme
            audioTheme.play();
            // log playerID
            console.log("PlayerID: " + playerID);
    
            // Get health, attack, and counter values
            playerName = $("#" + playerID).attr("name");
            playerHP = parseInt($("#" + playerID).attr("healthpoints"));
            playerAttack = parseInt($("#" + playerID).attr("attackpower"));
            baseAttackPower = playerAttack;
            playerCounter = parseInt($("#" + playerID).attr("counterattackpower"));
    
            // Move card to Your Character Section
            $("#" + playerID).addClass("bg-success");
            $("#" + playerID).appendTo("#yourCharacter");
    
            // set flag for first card selected
            isFirstCard = false;

            // tell player to choose opponent
            $(".main-prompt").text("Choose your opponent");
    
        },

        selectDefender: function() {

            // clear Battle Arena text
            $("#playerAttackDamage").text("");
            $("#enemyAttackDamage").text("");
            $("#arena-prompt").text("");
    
            // log ID
            console.log("DefenderID: " + defenderID);
    
            // Get health, attack, and counter values
            enemyName = $("#" + defenderID).attr("name");
            console.log("Defender: " + enemyName);
    
            enemyHP = parseInt($("#" + defenderID).attr("healthpoints"));
            console.log("Defender HP: " + enemyHP);
    
            enemyCounter = parseInt($("#" + defenderID).attr("counterattackpower"));

            // player should not be able to pick another card while battle is in play
            canPickCard = false;
    
            // Move card to Defender Section
            $("#" + defenderID).appendTo("#defender");
    
            // Change main prompt
            $(".main-prompt").text("BATTLE!");
    
            // fade IN the attack button
            $("#attack").fadeIn();
    
            // turn on attack button
            attackBtnActive = true;
    
            // change background to red, rest to gray
            $("#" + defenderID).addClass("bg-danger");
            $(".card").not("#" + playerID + ",#" + defenderID).addClass("bg-secondary");
    
    
            // move remaining cards to Characters Left section
            $(".card").not("#" + playerID + ",#" + defenderID).each(function (index) {
                $(this).appendTo("#charactersLeft");
            });
    
        },

        restart: function() {
            // Reload Page
            // location.reload();

            // turn on cards and move back to choose row
            $.each(characters, function (key, value) {
                var localCardID = "card" + key;
                $("#" + localCardID).show().removeClass("bg-secondary bg-danger bg-success").appendTo("#chooseChar");
                $(".card-text." + localCardID).text(value.health);
            });
    
            // reset variables
            status = "";
            canPickCard = true;
            isFirstCard = true;
            baseAttackPower = 0;
            playerName = "";
            playerHP = 0;
            playerAttack = 0;
            playerCounter = 0;
            playerID;
            defenderID;
            enemyName = "";
            enemyHP = 0;
            enemyAttack = 0;
            enemyCounter = 0;
            enemyCardCount = totalCardCount - 1;
            attackBtnActive = false;
    
            $("#restart").hide();
            $(".main-prompt").text("Choose Your Character");
            $("#playerAttackDamage").html("");
            $("#enemyAttackDamage").html("");
        },

        attack: function() {

            if (attackBtnActive) {
                
                console.log("ATTACK");
                console.log("Enemy Current HP: ", enemyHP);
    
                $("#playerAttackDamage").html("You attacked " + enemyName + " with <strong style='color: green'>" + playerAttack + "</strong> damage.");
                $("#enemyAttackDamage").html(enemyName + " attacked you with <strong style='color: red'>" + enemyCounter + "</strong> damage.");
    
                // Player Attacks First
                enemyHP -= playerAttack;
    
                // Player's Attack increases by base attack power
                playerAttack += baseAttackPower;
                console.log("New Attack Points: " + playerAttack);
    
                console.log("Enemy New HP: " + enemyHP);
                $(".card-text." + defenderID).text(enemyHP);
    
                // Determine if Enemy can Counter Attack
                if (enemyHP > 0) {
                    // lower Player HP
                    playerHP -= enemyCounter;
                    this.randomFX();
                } else {
                    this.randomFX();
                    // Enemy Loses- reduce enemy card count
                    enemyCardCount--;
                    console.log("Current Enemy Card Count: " + enemyCardCount);
    
                    // hide the attack button
                    $("#attack").hide();
    
                    if (enemyCardCount > 0) {
                        // Change Attack key to You Win
                        $(".main-prompt").text("You Won This Round!");
                        $("#arena-prompt").text("Choose your next opponent!");
    
                        // remove current opponent
                        $("#" + defenderID).hide();
                        // set isFirstCard to false and canPickCard to true to pick a new opponent or restart if done
                        isFirstCard = false;
                        canPickCard = true;
    
                    } else {
                        // PLAYER WINS GAME
                        status = 'You Won The Game!';
                        soundfx.setAttribute("src", "assets/sounds/Expecto_Patronum.mp3");
                        soundfx.play();
    
                        $(".main-prompt").text(status);
                        $("#arena-prompt").text("");
    
                        // PLAYER WINS GAME! DISPLAY MODAL
                        $("#modal-title").text(status);
                        $("#modal-text").text("Congratulations, " + playerName + "!");
                        $("#endgameModal").modal('show');
    
                        // hide the attack button
                        $("#attack").hide();
    
                        // Show restart button
                        $("#restart").show();
                    }
                }
    
                console.log("player HP: " + playerHP);
                $(".card-text." + playerID).text(playerHP);
    
                if (playerHP <= 0) {
                    // Change Attack key to You Lose
                    $(".main-prompt").text("YOU LOST!");
                    soundfx.setAttribute("src", "assets/sounds/Avada_Kedavra.mp3");
                    soundfx.play();
    
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
    
        },

        randomFX: function() {
            randomIndex = Math.floor(Math.random() * soundList.length);
            var fxSource = "assets/sounds/" + soundList[randomIndex];
            console.log("SoundFX path: ", fxSource);
            soundfx.setAttribute("src", fxSource)
            soundfx.play();
        }
    }

    // display the cards
    rpg.displayCards();

    //----------- jQuery Event Listeners

    // ATTACK BUTTON
    $("#attack").click(function () {
        rpg.attack();
    });

    // RESTART BUTTON
    $("#restart").click(function () {
        rpg.restart();
    });

    // Select Card
    $(".card").click(function () {
        // Can the player pick a card?
        if (canPickCard) {
            // alert($(this).attr("id") + " First Card? "+isFirstCard);
            // Is the player selecting the first card?
            if (isFirstCard) {
                playerID = $(this).attr("id");
                isFirstCard = false;
                rpg.selectPlayer();
            }
            // Otherwise select the second card
            else {
                defenderID = $(this).attr("id");
                // make sure first card can not be picked again this round
                if (defenderID !== playerID) {
                    rpg.selectDefender();
                }
            }
        }

    });

});
