// Make sure HTML is loaded before running
$(document).ready(function() {

    // Global Variables
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

    // Gets Link for Theme Song
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "assets/sounds/theme.mp3");

    // character objects
    var characters = [
        {
            name: "Harry Potter",
            health: 75,
            attack: 25,
            counter: 25,
            image: "harry2.jpg"
        },
        {
            name: "Hermione Granger",
            health: 75,
            attack: 25,
            counter: 25,
            image: "Hermione2.jpg"
        },
        {
            name: "Ron Weasley",
            health: 75,
            attack: 20,
            counter: 25,
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
            console.log(value.health);
            console.log(value.attack);
            console.log(value.counter);
            
            var cardID = "card"+ key;
                
            $("#chooseChar").append("<div/>", 
                {
                    "class": "card", 
                    "id": cardID, 
                    "style": "width:200px",
                    "name": value.name,
                    "healthpoints": value.health,
                    "attackpower": value.attack,
                    "counterattackpower": value.counter
                }
            ).append("<div class='card-body card" + key + "'>");

            
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


    displayCards();

    


    // Game Interaction Functions

    

    

    // Select Character
    function selectPlayer () {

            // alert("Card Clicked");
    
            // Get ID
            // var playerID = "#"+$(this).attr("id");
            alert(playerID);
    
            // Get health, attack, and counter values
            playerName = $("#"+playerID).attr("name");
            playerHP = parseInt($("#"+playerID).attr("healthpoints"));
            playerAttack = parseInt($("#"+playerID).attr("attackpower"));
            playerCounter = parseInt($("#"+playerID).attr("counterattackpower"));

            // Move card to Your Character Section
            $("#"+playerID).appendTo("#yourCharacter");

            // move remaining cards to Characters Left section
            $(".card").not("#"+playerID).each(function (index) {
                $(this).appendTo("#charactersLeft");
            });

            isFirstCard = false;


            
    
            // create text for Modal pop
            // var modalText = ' health: '+ cardHP + ', attack: ' + cardAttack + ', counter: ' + cardCounter;
            // $(".modal-title").text(cardName);
            // $(".modal-body").text(modalText);
    

    
            


    };

    function selectDefender () {

        // alert("Card Clicked");

        // Get ID

        alert(defenderID);

        // Get health, attack, and counter values
        enemyName = $("#"+defenderID).attr("name");
        alert(enemyName);
        enemyHP = parseInt($("#"+defenderID).attr("healthpoints"));
        alert(enemyHP);
        // enemyAttack = parseInt($(this).attr("attackPower"));
        enemyCounter = parseInt($("#"+defenderID).attr("counterattackpower"));
        canPickCard = false;

        // Move card to Defender Section
        $("#"+defenderID).appendTo("#defender");
        

        

        // create text for Modal pop
        // var modalText = ' health: '+ cardHP + ', attack: ' + cardAttack + ', counter: ' + cardCounter;
        // $(".modal-title").text(cardName);
        // $(".modal-body").text(modalText);



        


};

    // ATTACK button
    function attackButton() {
            // audioElement.play();
            console.log("ATTACK");
            console.log("Enemy Current HP: " + enemyHP);
            // First Player attacks
            enemyHP -= playerAttack;
            console.log("Enemy New HP: " + enemyHP);
            $(".card-text."+defenderID).text(enemyHP);
            if (enemyHP <= 0) {
                // Change Attack key to You Win
                alert("You Win");
                // Show Pick a new opponent or restart if done
            }

            // increase playerAttack by base number
            playerAttack += baseAttackPower;
            console.log("New Attack Points: " + playerAttack);

            playerHP -= enemyCounter;
            console.log("player HP: " + playerHP);
            $(".card-text."+playerID).text(playerHP);

            if (playerHP <= 0) {
                // Change Attack key to You Lose
                alert("You Lose");
                // Show Restart button
            }


    };


    // jQuery Event Listeners

    $(".attack-button").on("click", function() {
        attackButton();
    });


    // Click Card event
    $(".card").on("click", function () {

        // Can the player pick a card?
        if (canPickCard) {
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
