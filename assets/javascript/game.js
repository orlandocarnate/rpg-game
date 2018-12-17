// Make sure HTML is loaded before running
$(document).ready(function() {

    // Global Variables
    var canPickCard = true;
    var isFirstCharacter = true;

    var playerName;
    var playerHP;
    var playerAttack;
    var playerCounter;

    var enemyName;
    var enemyHP;
    var enemyAttack;
    var enemyCounter;

    // Gets Link for Theme Song
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "assets/sounds/theme.mp3");

    // character objects
    var characters = [
        {
            name: "Harry Potter",
            healthPoints: 75,
            attackPower: 25,
            counterAttackPower: 25,
            image: "harry2.jpg"
        },
        {
            name: "Hermione Granger",
            healthPoints: 75,
            attackPower: 25,
            counterAttackPower: 25,
            image: "Hermione2.jpg"
        },
        {
            name: "Ron Weasley",
            healthPoints: 75,
            attackPower: 20,
            counterAttackPower: 25,
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
    
                
            $("#chooseChar").append("<div class='card' id='card" + key + "' style='width:200px'>");
            $("#card"+key).attr("name", value.name);
            $("#card"+key).attr("healthpoints", value.healthPoints);
            $("#card"+key).attr("attackpower", value.attackPower);
            $("#card"+key).attr("counterattackpower", value.counterAttackPower);
    
            $("#card"+key).append("<div class='card-body card" + key + "'>");
    
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
    };

    // };

    displayCards();


    // Game Interaction Functions

    

    

    // Select Character
    function selectCharacter () {

            // alert("Card Clicked");
    
            // Get ID
            cardID = "#"+$(this).attr("id");
            // alert(cardID);
    
            // Get health, attack, and counter values
            if (isFirstCharacter) {
                // alert("First Pick");
                playerName = $(this).attr("name");
                playerHP = $(this).attr("healthPoints");
                playerAttack = $(this).attr("attackPower");
                playerCounter = $(this).attr("counterAttackPower");

                // Move card to Your Character Section
                $(cardID).appendTo("#yourCharacter");

                // move remaining cards to Characters Left section
                $(".card").not(cardID).each(function (index) {
                    $(this).appendTo("#charactersLeft");
                });

                isFirstCharacter = false;

            } else {
                enemyName = $(this).attr("name");
                enemyHP = $(this).attr("healthPoints");
                enemyAttack = $(this).attr("attackPower");
                enemyCounter = $(this).attr("counterAttackPower");
                canPickCard = false;

                // Move card to Defender Section
                $(cardID).appendTo("#defender");
            
            }
            
    
            // create text for Modal pop
            // var modalText = ' health: '+ cardHP + ', attack: ' + cardAttack + ', counter: ' + cardCounter;
            // $(".modal-title").text(cardName);
            // $(".modal-body").text(modalText);
    

    
            


    };

    // ATTACK button
    function attackButton() {
        $(".attack-button").on("click", function() {
            audioElement.play();
        });

    };


    // jQuery Event Listeners

    // Click Card event
    $(".card").on("click", function () {
        // You can only select card if first or second is not selected
        if (canPickCard) {
            selectCharacter();
            // If this is the first card then select first
            // if (isFirstCharacter) {
            //     isFirstCharacter = false;
            //     selectCharacter();
            // } else {
            //     selectCharacter();
            // }


        }
    });

    
});
