# Harry Potter RPG Game
## [Harry Potter RPG Game Webpage](https://orlandocarnate.github.io/rpg-game/)

My son loves the world of Harry Potter so I decided to do an RPG game based on those characters.

## Here's how the jQuery application works:

* When the game starts, the player will choose a character by clicking on the character's **card**, which will be used for the rest of the game.

* The player chooses the first opponent by clicking on an enemy's card.

* The selected opponent will be moved to the **Defender** section.

* The rest of the cards will move to the bottom **Opponents Left To Battle** area.

* The **ATTACK** button will become active.

* When the player clicks **ATTACK**, their character will damage the opponent and they will lose **HP**, shown at the bottom of the opponent card.

* The opponent will counter attack and the player's character will lose some of their **HP**, shown at the bottom of the player character's card.

* The player will keep hitting the attack button in an effort to defeat their opponent.

* When the defender's `HP` is reduced to zero or below, remove the enemy from the **Defender** area and hide the **ATTACK** button. The player character can now choose a new opponent.

* The player **WINS** the game by defeating **ALL** enemy characters. 

* The player **LOSES** the game the game if their **HP** falls to zero or below.

* A Bootstrap **Modal** will pop up, showing a Win or Lose status.
* The **ATTACK** button dissappears and the **RESTART** button appears.
* Pressing **RESTART** Reloads the webpage and starts the game over.


## Game Design Requirements

* Each character in the game has 3 attributes: `Health Points`, `Attack Power` and `Counter Attack Power`.

* Each time the player attacks, their character's Attack Power increases by its base Attack Power. 
  * For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on).

* The enemy character only has `Counter Attack Power`. 

    * Unlike the player's `Attack Points`, `Counter Attack Power` never changes.

* The `Health Points`, `Attack Power` and `Counter Attack Power` of each character must differ.

* No characters in the game can heal or recover Health Points. 

<!-- * A winning player must pick their characters wisely by first fighting an enemy with low `Counter Attack Power`. This will allow them to grind `Attack Power` and to take on enemies before they lose all of their `Health Points`. Healing options would mess with this dynamic.

* Your players should be able to win and lose the game no matter what character they choose. The challenge should come from picking the right enemies, not choosing the strongest player. -->


## PROGRAMMING NOTES

* **$(element1).not(element2,element3)** method - 
    * After selecting the first defending card the rest of the cards are moved into the **Opponents Left To Battle** section.

* Ex:
    ```
    $(".card").not("#"+playerID+",#"+defenderID).each(function (index) {
        $(this).appendTo("#charactersLeft");
    ```

* **`.children().length`** 
* To check if there are any card elements left in the **Opponents Left To Battle** section I used the `.children().length` methods. If the player defeats the enemy and the element count equals zero the player wins.

* Ex:
    ```
    if ($("#charactersLeft").children('.card').length > 0) {
    ```
* I ended not using the children length function. I did a count card variable instead. If the cards that are left is equal to zero then player wins.

* For loop works with objects in an array **DO NOT WORK IN jQUERY** 

* This doesn't work:

    ```
    //For loop looks through each object and displays the values
        for(var i = 0; i < characters; i++) {
                console.log(characters[i].name);
                console.log(characters[i].healthPoints);
                console.log(characters[i].attackPower);
                console.log(characters[i].counterAttackPower);
        }
    ```

* Use the `.each()` to loop through an object array.

    ```
    // Outer key, value pairs
    $.each(characters, function(i, currentChar) {
    // Inner Key, Value pairs
            $.each(currentChar, function (key, val){

                console.log(key, val)
            });

    });
    ```

* Movie sound clips from http://www.moviesoundclips.net

* To move an element try 
    ```
    jQuery("#NodesToMove").detach().appendTo('#DestinationContainerNode')
    ```

* to get index of an element within another element try:
    https://learn.jquery.com/using-jquery-core/understanding-index/



* Removing and Re-Adding elements will mess up `.on()` events because `.on()` works only on current elements. Needs to be reset somehow.
    From the jQuery docs: 
    **Event handlers are bound only to the currently selected elements; they must exist at the time your code makes the call to `.on()`.**

    Ex:
        ```
        $( "#dataTable tbody tr" ).on( "click", function() {
            console.log( $( this ).text() );
        });
        ```

    Event Delegation:
        ```
        $( "#dataTable tbody" ).on( "click", "tr", function() {
            console.log( $( this ).text() );
        });
    ```

* **FINAL NOTE ON RESTART BUTTON** 
    * Will avoid using location.reload as the easy way to restart the game, will try to reset all the variables.
    * There were **event delegation** problems using `.remove()` and `.append()` the cards with the same IDs. 
    * I used `.hide()` and `.show()` and the problem went away. Took a long time to figure out.