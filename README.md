### Option Two: Harry Potter RPG Game (Challenge)

My son loves the world of Harry Potter so I decided to do a game based on that instead of Star Wars.

Here's how the JavaScript application works:

   * When the game starts, the player will choose a character by clicking on the character's **card**, which will be used for the rest of the game.
   * The player must then defeat all of the remaining characters.
   * The player chooses the first opponent by clicking on an enemy's card.
   * The selected opponent will be moved to the fighting 'arena'.
   * The **attack button** will become active.
   * When the player clicks **attack**, their character will damage the opponent and they will lose **HP**, shown at the bottom of the opponent card.
     * The opponent will counter the attack. When that happens, the player's character will lose some of their **HP**,shown at the bottom of the player character's card.

3. The player will keep hitting the attack button in an effort to defeat their opponent.

   * When the defender's `HP` is reduced to zero or below, remove the enemy from the `defender area`. The player character can now choose a new opponent.

4. The player wins the game by defeating all enemy characters. The player loses the game the game if their character's `HP` falls to zero or below.


##### Option 2 Game design notes

* Each character in the game has 3 attributes: `Health Points`, `Attack Power` and `Counter Attack Power`.

* Each time the player attacks, their character's Attack Power increases by its base Attack Power. 
  * For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on).
* The enemy character only has `Counter Attack Power`. 

  * Unlike the player's `Attack Points`, `Counter Attack Power` never changes.

* The `Health Points`, `Attack Power` and `Counter Attack Power` of each character must differ.

* No characters in the game can heal or recover Health Points. 

  * A winning player must pick their characters wisely by first fighting an enemy with low `Counter Attack Power`. This will allow them to grind `Attack Power` and to take on enemies before they lose all of their `Health Points`. Healing options would mess with this dynamic.

* Your players should be able to win and lose the game no matter what character they choose. The challenge should come from picking the right enemies, not choosing the strongest player.

### Reminder: Submission on BCS

* Please submit both the deployed Github.io link to your homework AND the link to the Github Repository!

- - -

### Minimum Requirements

Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed. Adding a README.md as well as adding this homework to your portfolio are required as well and more information can be found below.

- - -

### Create a README.md

Add a `README.md` to your repository describing the project. Here are some resources for creating your `README.md`. Here are some resources to help you along the way:

* [About READMEs](https://help.github.com/articles/about-readmes/)

* [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)

- - -

### Add To Your Portfolio

After completing the homework please add the piece to your portfolio. Make sure to add a link to your updated portfolio in the comments section of your homework so the TAs can easily ensure you completed this step when they are grading the assignment. To receive an 'A' on any assignment, you must link to it from your portfolio.


## NOTES
For loop works with objects in an array **DO NOT WORK IN jQUERY** 

This doesn't work:
```
//For loop looks through each object and displays the values
    for(var i = 0; i < characters; i++) {
            console.log(characters[i].name);
            console.log(characters[i].healthPoints);
            console.log(characters[i].attackPower);
            console.log(characters[i].counterAttackPower);
    }
```

Use the `.each()`
```
// Outer key, value pairs
$.each(characters, function(i, currentChar) {
  // Inner Key, Value pairs
        $.each(currentChar, function (key, val){

            console.log(key, val)
        });

});
```

Movie sound clips from http://www.moviesoundclips.net

To move an element try 
`jQuery("#NodesToMove").detach().appendTo('#DestinationContainerNode')`

to get index of an element within another element try:
https://learn.jquery.com/using-jquery-core/understanding-index/


Pseudocode for moving cards to opponent section:
If card was selected, move it to the Player section
otherwise move it to the opponent section.

* Removing and Re-Adding elements will mess up `.on()` events because `.on()` works only on current elements. Needs to be reset somehow.
From the jQuery docs: 
**Event handlers are bound only to the currently selected elements; they must exist at the time your code makes the call to `.on()`.**
* I will need to use **Delegated event handlers** for it to work.
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